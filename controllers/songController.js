const Album = require("../models/albums");
const Song = require("../models/songs");
const User = require('../models/songs')

// Defining methods
module.exports = {
  insert: function (req, res) {
    // console.log(req.body);
    const { albumId, title, fileUrl, user } = req.body;
    const newSong = { albumId, title, fileUrl, user};
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
  findSongByUserId: function(req, res) {
    Song.find({'user._id' : req.params.id})
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
  insertAlbumInfo: function (req, res) {
    const { albumId, album } = req.body;
    console.log("hit", albumId, album)
    Song.updateMany({albumId : albumId }, { $set: {album : album}})
    // Song.findByIdAndUpdate(
    //   albumId,
    //   { $push: { album: album } },
    //   { new: true }
    // )
    // .populate("albumId")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // insertArt: function (req, res) {
  //   // console.log("body", req.body);
  //   const { albumId, album_art } = req.body;
  //   Song.updateMany({albumId : albumId }, { $set: {album_art : album_art}})
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  remove: function(req, res) {
    const songId = req.params.id;
    console.log(`the id to delete is: ${songId}`);
    Song.findById({ _id: req.params.id })
      .then(dbModel => {

       
        dbModel.remove();
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};


