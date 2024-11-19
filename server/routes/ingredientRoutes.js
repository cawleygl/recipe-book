import express from 'express';
import controller from '../controllers/ingredientController.js';

const ingredientRoutes = express.Router();

// GET /ingredients - Get all ingredients
ingredientRoutes.get('/', controller.all);
// POST /ingredients - Create new ingredient
ingredientRoutes.post('/', controller.create);
// DELETE /ingredients/:id - Delete existing ingredient
ingredientRoutes.delete('/:id', controller.delete);

export default ingredientRoutes;