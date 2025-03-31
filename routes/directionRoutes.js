import express from 'express';
import controller from '../controllers/directionController.js';

const directionRoutes = express.Router({mergeParams: true});

// POST recipes/:id/directions - Get all directions on a recipe
directionRoutes.get('/', controller.all);
// POST recipes/:id/directions - Create new direction
directionRoutes.post('/', controller.create);
// PUT recipes/:id/directions/:directionID - Update a direction
directionRoutes.put('/:directionID', controller.update);
// DELETE recipes/:id/directions/:directionID - Delete a direction
directionRoutes.delete('/:directionID', controller.delete);

export default directionRoutes;