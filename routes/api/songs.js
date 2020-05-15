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
  .delete(songController.remove);

// other
  router
  .route("/userId/:id")
  .get(songController.findSongByUserId)
  router
  .route("/info")
  .put(songController.insertAlbumInfo)

  module.exports = router;