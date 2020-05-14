const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "/api/songs"
router
  .route("/")
  .post(songController.insert)
  .get(songController.findAll)
  .put(songController.insertArt)
  .get(songController.getArtist)

// // Matches with "/api/songs/:id"
// router
//   .route("/:id")
//   .get(songsController.findById)
//   .put(songsController.update)
//   .delete(songsController.remove);


  module.exports = router;