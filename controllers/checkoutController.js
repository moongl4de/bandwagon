
const Checkout = require('../models/checkout')

// Defining methods
module.exports = {

  create: function(req, res) {
    console.log(req.body)
    Checkout.create(req.body)
      .then(dbModel => res.json(dbModel._id))
      .catch(err => res.status(422).json(err));
  }
};


