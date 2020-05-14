const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "/api/songs"
router
  .route("/")
  .post(songController.insert)
  .get(songController.findAll)
  .put(songController.updateSong)
  .put(songController.insertArt)
  .get(songController.getArtist)
  .delete(songController.remove);

// Matches with "/api/songs/:id"
  router
  .route("/:id")
  .get(songController.findSongById)

  module.exports = router;