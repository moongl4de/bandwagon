const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'user'
    // },
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
    // plays: {
    //   type: Number,
    //   default: 0
    // },
    // album_art: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'album'
    // },
    // release: {
    //   type: Date
    // },
    // artists: {
    //   type: String
    // },
    // date: {
    //   type: Date,
    //   default: Date.now
    // }
  },
  {
    timestamps: true,
  }
);

module.exports = Song = mongoose.model("songs", SongSchema);
