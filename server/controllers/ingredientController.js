import model from "../models/ingredient.js";

const controller = {
	// GET /ingredients - Get all ingredients
	all: async (req, res, next) => {
		model
			.find()
			.then((ingredients) => {
				if (ingredients && ingredients[0]) {
					res.json(ingredients);
				} else {
					res.status(404).send("No Ingredients Found");
				}
			})
			.catch((error) => next(error));
	},
	// POST /ingredients - Create new ingredient
  create: async (req, res, next) => {
    let ingredient = new model(req.body);
    ingredient
      .save()
      .then((ingredient) => {
        res.json(ingredient);
      })
			.catch((error) => next(error));
  },
};

export default controller;
