const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      // required: true
    },
    art: {
      type: Object,
    },
    // release: {
    //   type: Date,
    // },
    song_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "songs",
        // required: true,
      },
    ],
    description: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = Album = mongoose.model("album", AlbumSchema);
