import model from "../models/calls_for.js";

const controller = {
	// GET /recipes/:id/callsFor - Get all calls fors (Ingredients on Recipe) on a recipe
	all: async (req, res, next) => {
		let id = req.params.id;
		model
			.find({ recipe: id }).populate("ingredient", "ingredientName")
			.then((callsFor) => {
				if (callsFor && callsFor[0]) {
					res.json(callsFor);
				} else {
					res.status(404).send("No Ingredients Found on Recipe");
				}
			})
			.catch((error) => {
				res.status(400).json(error);
				next(error);
			});
	},
	// POST /recipes/:id/callsFor - Create new calls for object (Add ingredient to recipe)
	create: async (req, res, next) => {
		let callsFor = new model(req.body);

		callsFor
			.save()
			.then((callsFor) => {
				res.json(callsFor);
			})
			.catch((err) => {
				res.json({ message: err.message });
			});
	},
		// PUT /recipes/:id/callsFor/:id - Update existing Calls For (Ingredient on Recipe)
		update: async (req, res, next) => {
			let callsForBody = req.body;
			let callsForID = req.params.callsForID;
	
			model
				.findByIdAndUpdate(callsForID, callsForBody, {
					useFindAndModify: false,
					runValidators: true,
				})
				.then((callsFor) => {
					if (callsFor) {
						res.json(callsFor);
					} else {
						res.status(404).json(`No Calls For (Ingredient) Found with ID ${req.params.callsForID}`);
						next(error);
					}
				})
				.catch((error) => {
					res.status(400).json(error);
					next(error);
				});
		},
		// DELETE /recipes/:id/callsFor/:id - Delete a callsFor (Remove Ingredient from Recipe)
		delete: async (req, res, next) => {
			let callsForID = req.params.callsForID;
			model.findByIdAndDelete(callsForID, { useFindAndModify: false })
				.then((response) => {
					res.json(response);
				})
				.catch((error) => {
					res.status(400).json(error);
					next(error);
				});
		}
};

export default controller;
