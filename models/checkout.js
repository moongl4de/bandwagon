const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({

  token:{
    type: Object
  },
  subscription: {
    type: Object
  }
});

module.exports = Checkout = mongoose.model('checkout', CheckoutSchema);