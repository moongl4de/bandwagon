const mongoose = require('mongoose');

//this is just a draft

const ListenerSchema = new mongoose.Schema({
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

module.exports = Listener = mongoose.model('listener', ListenerSchema);