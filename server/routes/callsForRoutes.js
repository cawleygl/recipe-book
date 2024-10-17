import express from 'express';
import controller from '../controllers/callsForController.js';

const callsForRoutes = express.Router();

// POST /callsFor - Create new calls for object (Add ingredient to recipe)
callsForRoutes.post('/', controller.create);

export default callsForRoutes;