const router = require("express").Router();
const checkoutController = require("../../controllers/checkoutController");

// Matches with "/api/checkout"
router
  .route("/")

  .post(checkoutController.create);


module.exports = router;