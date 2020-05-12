const mongoose = require('mongoose');

//this is just a draft

const ArtistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  email:{
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique:true
  },
  name: {
    type: String
  },
  username: {
    type: String
  },
  userId:{
    type: String
  },
  avatar: {
    type: Object
  },
  primarygenre: {
    type: String,
  },
  secondarygenre: {
    type: String,
  },
  city:{
    type: String,
  },
  country: {
    type: String,
  },
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
  },
  bio: {
    type: String
  }
});

module.exports = Artist = mongoose.model('artist', ArtistSchema);