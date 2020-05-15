const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'album'
    },
    title: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    token_earned:{
      type: Number,
      default:0
    },
    count_play:{
      type:Number,
      default:0
    },
    album: {
      type: Object,
    },
    album_art: {
      type: Object,
    },
    // release: {
    //   type: Date
    // },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'artist'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Song = mongoose.model("songs", SongSchema);
