import model from "../models/recipe.js";
import direction from "../models/direction.js"
import callsFor from "../models/calls_for.js"

const controller = {
  // GET /recipes - Get all recipes
  all: async (req, res, next) => {
    model
      .find()
      .then((recipes) => {
        if (recipes && recipes[0]) {
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

    Promise.all([model.findById(recipeId), direction.find({recipe : recipeId}), callsFor.find({recipe : recipeId}).populate("ingredient")])
      .then((results) => {
        if (results) {
					console.log("results", results);
					const [ recipe, directions, ingredients ] = results; 
					// Sort directions by index
					directions.sort((a, b) => a.index - b.index);
          res.json({recipe, directions, ingredients});
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
    let recipe = new model(req.body);

    recipe
      .save()
      .then((recipe) => {
        res.json(recipe);
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  // PUT /recipes/:id - Update existing recipe
  update: async (req, res, next) => {
    let recipe = req.body;
    let id = req.params.id;

    model
      .findByIdAndUpdate(id, recipe, {
        useFindAndModify: false,
        runValidators: true,
      })
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
  // DELETE /recipes/:id - Delete specific recipe
  delete: async (req, res, next) => {
    let id = req.params.id;

    model
      .findByIdAndDelete(id, { useFindAndModify: false })
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
