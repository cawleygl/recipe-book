import model from "../models/ingredient.js";
import callsFor from "../models/calls_for.js"

const controller = {
	// GET /ingredients - Get all ingredients
	all: async (req, res, next) => {
		model
			.find()
			.then((ingredients) => {
				if (ingredients && ingredients[0]) {
					// Sort ingredients by name
					ingredients.sort((a, b) => a.ingredientName.localeCompare(b.ingredientName));
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
	// PUT /ingredients/:id/ - Update existing ingredient
	update: async (req, res, next) => {
		let ingredient = req.body;
		let id = req.params.id;

		model
			.findByIdAndUpdate(id, ingredient, {
				useFindAndModify: false,
				runValidators: true,
			})
			.then((ingredient) => {
				if (ingredient) {
					res.json(ingredient);
				} else {
					res.status(404).json(`No Ingredient Found with ID ${req.params.id}`);
					next(error);
				}
			})
			.catch((error) => {
				res.status(400).json(error);
				next(error);
			});
	},
	// DELETE /ingredients/:id/ - Delete an ingredient
	delete: async (req, res, next) => {
		let id = req.params.id;

		Promise.all([model.findByIdAndDelete(id, { useFindAndModify: false }), callsFor.deleteMany({ ingredient: id })])
			.then((ingredient) => {
				if (ingredient) {
					res.json(ingredient);
				} else {
					res.status(404).json(`No Ingredients Found with ID ${req.params.id}`);
				}
			})
			.catch((err) => {
				res.json({ message: err.message });
			});
	},

};

export default controller;
