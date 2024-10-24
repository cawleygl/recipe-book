import express from 'express';
import controller from '../controllers/callsForController.js';

const callsForRoutes = express.Router({mergeParams: true});

// GET /recipes/:id/callsFor - Get all calls for recipe (Get all ingredients on recipe)
callsForRoutes.get('/', controller.all);
// POST /recipes/:id/callsFor - Create new calls for object (Add ingredient to recipe)
callsForRoutes.post('/', controller.create);
// PUT recipes/:id/callsFor/:callsForID - Update a direction
callsForRoutes.put('/:callsForID', controller.update);
// DELETE recipes/:id/callsFor/:callsForID - Delete a direction
callsForRoutes.delete('/:callsForID', controller.delete);

export default callsForRoutes;