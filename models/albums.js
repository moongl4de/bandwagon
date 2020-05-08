const mongoose = require('mongoose');

//this is just a draft

const AlbumSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  title: {
    type: String
  },
  art: {
    type: Object
  },
  release: {
    type: Date
  },
  songs: {
    type: Array,
    required: true,
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
},
{ timestamps: true},);

module.exports = Album = mongoose.model('album', AlbumSchema);