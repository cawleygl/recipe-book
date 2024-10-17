import model from "../models/calls_for.js";

const controller = {
// POST /callsFor - Create new calls for object (Add ingredient to recipe)
create: async (req, res, next) => {
    let callsFor = new model(req.body);

    callsFor
      .save()
      .then((callsFor) => {
        res.json(callsFor);
      })
      .catch((err) => {
        res.json({ mesage: err.message });
      });
  },
};

export default controller;
