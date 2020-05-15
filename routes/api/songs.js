const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "/api/songs"
router
  .route("/")
  .post(songController.insert)
  .get(songController.findAll)
  .put(songController.updateSong)
  .delete(songController.remove);

// Matches with "/api/songs/:id"
  router
  .route("/:id")
  .get(songController.findSongById)

  router
  .route("/info")
  .put(songController.insertAlbumInfo)

  module.exports = router;