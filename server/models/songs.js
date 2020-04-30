const mongoose = require('mongoose');

//this is just a draft

const SongsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String
  },
  albumcover: {
    type: Object
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