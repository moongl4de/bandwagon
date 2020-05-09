const router = require("express").Router();
const userController = require("../../controllers/userController");
// const Song = require('../../models/songs')
// const User = require('../../models/user')
// const mongoose = require('mongoose')

// Matches with "/api/user"
router
  .route("/")
  .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;