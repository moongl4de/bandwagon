const router = require("express").Router();
const songController = require("../../controllers/songController");

router
  .route("/")
  .post(songController.insert)
  .get(songController.findAll)
  .put(songController.updateSong)
  .put(songController.insertArt)


  router
  .route("/:id")
  .get(songController.findSongById)
  
// Matches with "/api/songs"
// router
//   .route("/")
//   .get(songsController.findAll)
//   .post(songsController.create);

// // Matches with "/api/songs/:id"
// router
//   .route("/:id")
//   .get(songsController.findById)
//   .put(songsController.update)
//   .delete(songsController.remove);


  module.exports = router;