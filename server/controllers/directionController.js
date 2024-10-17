import model from "../models/direction.js";

const controller = {
	// GET /recipes/:id/directions - Get all directions on a recipe
	all: async (req, res, next) => {
		let id = req.params.id;
		model
			.find({ recipe: id })
			.then((directions) => {
				if (directions && directions[0]) {
					// Sort directions by index
					directions.sort((a, b) => a.index - b.index);
					res.json(directions);
				} else {
					res.status(404).send("No Directions Found");
				}
			})
			.catch((error) => {
				res.status(400).json(error);
				next(error);
			});
	},
	// POST /recipes/:id/directions - Create new direction
	create: async (req, res, next) => {
		let direction = new model(req.body);
		direction
			.save()
			.then((direction) => {
				res.json(direction);
			})
			.catch((error) => {
				res.status(400).json(error);
				next(error);
			});
	},
	// PUT /recipes/:id/directions/:id - Update existing direction
	update: async (req, res, next) => {
		let directionBody = req.body;
		let directionID = req.params.directionID;

		model
			.findByIdAndUpdate(directionID, directionBody, {
				useFindAndModify: false,
				runValidators: true,
			})
			.then((direction) => {
				if (direction) {
					res.json(direction);
				} else {
					res.status(404).json(`No Directions Found with ID ${req.params.id}`);
					next(error);
				}
			})
			.catch((error) => {
				res.status(400).json(error);
				next(error);
			});
	},
	// DELETE /recipes/:id/directions/:id - Delete a direction
	delete: async (req, res, next) => {
		let directionID = req.params.directionID;
		model.findByIdAndDelete(directionID, { useFindAndModify: false })
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
