import mongoose from "mongoose";
import model from "../models/recipe.js";
import direction from "../models/direction.js";
import ingredient from "../models/ingredient.js";
import callsFor from "../models/calls_for.js";

const controller = {
  // GET /recipes - Get all recipes
  all: async (req, res, next) => {
    model
      .find()
      .then((recipes) => {
        if (recipes && recipes[0]) {
          recipes.sort((a, b) => a.dishName - b.dishName);
          res.json(recipes);
        } else {
          res.status(404).send("No Recipes Found");
        }
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  // GET /recipes/:id - Get one recipe from ID param
  show: async (req, res, next) => {
    let recipeId = req.params.id;

    Promise.all([model.findById(recipeId), direction.find({ recipe: recipeId }), callsFor.find({ recipe: recipeId }).populate("ingredient")])
      .then((results) => {
        if (results) {
          console.log("results", results);
          const [recipe, directions, ingredients] = results;
          // Sort directions by index
          directions.sort((a, b) => a.index - b.index);
          res.json({ recipe, directions, ingredients });
        } else {
          res.status(404).json(`No Recipes Found with ID ${req.params.id}`);
        }
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  // POST /recipes - Create new recipe
  create: async (req, res, next) => {
    let recipeBody = req.body;

    const { recipe: recipeData, directions, callsFors } = recipeBody;
    const ingredients = [];
    console.log("RECIPE", recipeData);
    console.log("DIRECTIONS", directions);
    console.log("CALLSFORS", callsFors);

    let recipe = new model(recipeData);
    console.log("RECIPE ID?", recipe._id);

    // Add recipe id to every direction
    for (let i in directions) {
      directions[i].recipe = recipe._id;
    }
    // Add recipe id to every callsFors, and replace ingredient object with id
    for (let i in callsFors) {
      // Add ingredient if no ingredient ID
      if (!callsFors[i].ingredient._id) {
        callsFors[i].ingredient._id = new mongoose.Types.ObjectId();
        let ingredientDocument = {
          _id: new mongoose.Types.ObjectId(callsFors[i].ingredient._id),
          ingredientName: callsFors[i].ingredient.ingredientName
        };
        ingredients.push(ingredientDocument);
        console.log("ADD INGREDIENT", ingredientDocument);
      }
      callsFors[i].recipe = recipe._id;
      const ingredientID = callsFors[i].ingredient._id;
      callsFors[i].ingredient = ingredientID;
    }

    Promise.all([
      recipe.save(),
      direction.insertMany(directions, { rawResult: true }),
      ingredient.insertMany(ingredients, { rawResult: true }),
      callsFor.insertMany(callsFors, { rawResult: true }),
    ])
      .then((recipe) => {
        res.json(recipe);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          console.log("err", err);
          res.status(403).send({ error: err.message });
          return;
        }
        next(err);
      });
  },
  // PUT /recipes/:id - Update existing recipe
  update: async (req, res, next) => {
    let recipeBody = req.body;
    let id = req.params.id;

    const { recipe, directions, callsFors } = recipeBody;
    console.log("RECIPE", recipe);
    console.log("DIRECTIONS", directions);
    console.log("CALLSFORS", callsFors);

    let directionOperations = [];
    for (let i in directions) {
      if (!directions[i]._id) directions[i]._id = new mongoose.Types.ObjectId();
      let directionDocument = {
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(directions[i]._id) },
          update: {
            recipe: new mongoose.Types.ObjectId(id),
            index: directions[i].index,
            instruction: directions[i].instruction,
          },
          upsert: true,
        }
      };
      directionOperations.push(directionDocument);
    }
    console.log("directionOperations", JSON.stringify(directionOperations));

    let ingredientOperations = [];
    let callsForOperations = [];
    for (let i in callsFors) {
      // Add ingredient if no ingredient ID
      if (!callsFors[i].ingredient._id) {
        callsFors[i].ingredient._id = new mongoose.Types.ObjectId();
        let ingredientDocument = {
          _id: new mongoose.Types.ObjectId(callsFors[i].ingredient._id),
          ingredientName: callsFors[i].ingredient.ingredientName
        };
        ingredientOperations.push(ingredientDocument);
        console.log("ADD INGREDIENT", ingredientDocument);
      }
      // upsert callsFor
      // Assign callsFor ID if none exists and 
      if (!callsFors[i]._id) callsFors[i]._id = new mongoose.Types.ObjectId();
      // save ingredient ID
      const ingredientID = callsFors[i].ingredient._id;

      let callsForDocument = {
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(callsFors[i]._id) },
          update: {
            recipe: new mongoose.Types.ObjectId(id),
            amount: callsFors[i].amount,
            modifier: callsFors[i].modifier,
            ingredient: new mongoose.Types.ObjectId(ingredientID)
          },
          upsert: true,
        }
      };

      console.log("UPSERT CALLSFOR", callsForDocument);
      callsForOperations.push(callsForDocument);
    }

    console.log("ingredientOperations", JSON.stringify(ingredientOperations));
    console.log("callsForOperations", JSON.stringify(callsForOperations));

    Promise.all([
      model.findByIdAndUpdate(id, recipe, {
        useFindAndModify: false,
        runValidators: true,
      }),
      direction.bulkWrite(directionOperations),
      ingredient.insertMany(ingredientOperations, { rawResult: true }),
      callsFor.bulkWrite(callsForOperations),
    ]).then((results) => {
      if (results) {
        console.log("results", results);
        res.json(results);
      } else {
        res.status(404).json(`No Recipes Found with ID ${req.params.id}`);
      }
    })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  },
  // DELETE /recipes/:id - Delete specific recipe
  delete: async (req, res, next) => {
    let id = req.params.id;

    Promise.all([model.findByIdAndDelete(id, { useFindAndModify: false }), direction.deleteMany({ recipe: id }), callsFor.deleteMany({ recipe: id })])
      .then((recipe) => {
        if (recipe) {
          res.json(recipe);
        } else {
          res.status(404).json(`No Recipes Found with ID ${req.params.id}`);
        }
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
};

export default controller;
