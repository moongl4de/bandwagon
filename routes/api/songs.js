const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "/api/songs"
router
  .route("/")
  .post(songController.insert)
  .get(songController.findAll)
  .put(songController.updateSong)

  // .put(songController.insertArt)

  .delete(songController.remove);


// Matches with "/api/songs/:id"
  router
  .route("/:id")
  .get(songController.findSongById)
  .delete(songController.remove);
  
// Matches with "/api/songs"
// router
//   .route("/")
//   .get(songsController.findAll)
//   .post(songsController.create);

// Matches with "/api/songs/:id"
// router
//   .route("/:id")
//   .get(songsController.findById)
//   .put(songsController.update)
//   .delete(songsController.remove);

  router
  .route("/info")
  .put(songController.insertAlbumInfo)

  module.exports = router;