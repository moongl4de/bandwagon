const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'album'
  },
  fileUrl: {
    type: String
  },
  title: {
    type: String
  },
  albumcover: {
    type: Object,
    ref: 'album'
  },
  release: {
    type: Date
  },
  artists: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
}, );


module.exports = Song = mongoose.model('songs', SongSchema);