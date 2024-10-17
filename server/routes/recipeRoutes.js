import express from 'express';
import controller from '../controllers/recipeController.js';
import directionRoutes from "../routes/directionRoutes.js";

const recipeRoutes = express.Router();

// GET /recipes - Get all recipes
recipeRoutes.get('/', controller.all);
// GET /recipes/:id - Get one recipe (with ingredients and directions) from ID param
recipeRoutes.get('/:id', controller.show);
// POST /recipes - Create new recipe
recipeRoutes.post('/', controller.create);
// PUT /recipes/:id - Update existing recipe
recipeRoutes.put('/:id', controller.update);
// DELETE /recipes/:id - Delete existing recipe
recipeRoutes.delete('/:id', controller.delete);

// Direction Routes
recipeRoutes.use("/:id/directions", directionRoutes);

export default recipeRoutes;