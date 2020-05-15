const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    user: {
      type: Object,
    },
    title: {
      type: String,
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
      },
    ],
    description: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = Album = mongoose.model("album", AlbumSchema);
