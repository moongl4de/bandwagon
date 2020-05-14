const Album = require("../models/albums");
const Song = require("../models/songs");

// Defining methods
module.exports = {
  insert: function (req, res) {
    console.log(req.body);
    const { albumId, title, fileUrl, user } = req.body;
    const newSong = { albumId, title, fileUrl, user };
    // const { user, albumId, title, fileUrl } = req.body;
    // const newSong = { user, albumId, title, fileUrl };
    Song.create(newSong)
      .then((dbModel) =>
        Album.findByIdAndUpdate(
          albumId,
          { $push: { song_ids: dbModel._id } },
          { new: true }
        ).populate("song_ids")
      )
      .then((newAlbum) => {
        res.json(newAlbum);
      })
      .catch((err) => res.status(422).json(err));
  },
  findAll: function (req, res) {
    Song.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
    findSongById: function(req, res) {
      Song.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
    updateSong: function(req, res) {
    const { _id } = req.body;
    Song.findByIdAndUpdate(_id, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    const { _id } = req.body;
    Album.findByIdAndUpdate(_id, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  insertArt: function (req, res) {
    console.log("body", req.body);
    const { albumId, album_art } = req.body;
    console.log("hit", albumId, album_art)
    Song.updateMany({albumId : albumId }, { $set: {album_art : album_art}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  //   remove: function(req, res) {
  //     Song.findById({ _id: req.params.id })
  //       .then(dbModel => dbModel.remove())
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   }


//  //ALBUMS
  // insertArt: function (req, res) {
  //   console.log(req.body);
  //   const { albumId, art } = req.body;
  //   const Art = { art };
  //     Song.findByIdAndUpdate(
  //         albumId,
  //         { $push: { album_art: Art } },
  //         { new: true }
  //       ).populate("album_art")
  //     .then((newArt) => {
  //       res.json(newArt);
  //     })
  //     .catch((err) => res.status(422).json(err));
  // },
  // insertArt: function (req, res) {
  //   console.log(req.body);
  //   const { albumId, art } = req.body;
  //   const Art = { art };
  //   console.log("hit", Art)
  //   Song.updateMany({albumId: "albumId"}, {$set: {album_art: "art"}})
  //     .then((newArt) => {
  //       res.json(newArt);
  //     })
  //     .catch((err) => res.status(422).json(err));
  // },
  // insertArt: function (req, res) {
  //   console.log(req.body);
  //   // const { albumId, art } = req.body;
  //   // const Art = { art };
  //   console.log("hit")
  //   const { albumId, album_art  } = req.body;
  //   Song.findByIdAndUpdate( albumId, album_art)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  insertArt: function (req, res) {
    console.log("body", req.body);
    const { albumId, album_art } = req.body;
    console.log("hit", albumId, album_art)
    Song.updateMany({albumId : albumId }, { $set: {album_art : album_art}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Song.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
  // insertArt: function (req, res) {
  //   console.log(req.body);
  //   const { albumId, album_art } = req.body;
  //   console.log('hit', albumId, album_art);
  //   Album.findOne({ _id: albumId })
  //     .populate('songs')
  //     .then(album => {
  //       Promise.all(
  //           // It might be necessary to use .map rather than .forEach
  //         album.songs.forEach(song => {
  //           return Song.findOneAndUpdate(
  //             { _id: song._id },
  //             { album_art: album_art },
  //             { new: true }
  //           );
  //         })
  //       )
  //         .then(updatedSongsArray => {
  //           console.log(updatedSongsArray);
  //           console.log(
  //             album
  //           ); /** Not sure if this will show the updated songs */
  //           // You may need to query for the album again here, or you can respond with the songs array
  //           res.json(updatedSongsArray);
  //         })
  //         .catch(err => res.status(422).json(err));
  //     })
  //     .catch(err => res.status(422).json(err));
  // }


