const Album = require('../models/albums')
const Song = require("../models/songs");
// const Song = require('../models/songs')

// Defining methods
module.exports = {

 //ALBUMS 

  findAll: function(req, res) {
    Album.find(req.query)
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Album.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body)
    Album.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    const { _id } = req.body;
    Album.findByIdAndUpdate(_id, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

// SONGS

  // insert: function(req, res) {
  //   console.log(req.body)
  //   const {albumId, title, fileUrl} = req.body;
  //   const newSong = {albumId, title, fileUrl}
  //   Song.create(newSong)
  //     .then(dbModel => 
  //       Album.findByIdAndUpdate(albumId, 
  //         {$push: {song_ids: dbModel._id}}, 
  //         {new: true})
  //         .populate("song_ids"))
  //         .then(newAlbum => {
  //           res.json(newAlbum)
  //         }) 
  //     .catch(err => res.status(422).json(err));
  // },
  // findAll: function(req, res) {
  //   Song.find(req.query)
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   Song.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};


