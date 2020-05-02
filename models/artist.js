const mongoose = require('mongoose');

//this is just a draft

const ArtistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  avatar: {
    type: Object
  },
  release: {
    type: Date
  },
  status: {
    type: String,
    required: true
  },
  genres: {
    type: [Object],
    required: true,
    ref: 'genres'
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

module.exports = Artist = mongoose.model('artist', ArtistSchema);