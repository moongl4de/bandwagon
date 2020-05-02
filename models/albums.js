const mongoose = require('mongoose');

//this is just a draft

const AlbumSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String
  },
  cover: {
    type: Object
  },
  release: {
    type: Date
  },
  status: {
    type: String,
    required: true
  },
  songs: {
    type: [Object],
    required: true,
    ref: 'songs'
  },
  artists: {
    type: String
  },
  notes: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
},
{ timestamps: true},);

module.exports = Album = mongoose.model('album', AlbumSchema);