const mongoose = require("mongoose");
const Album = require("../models/albums");
const Song = require("../models/songs");

// This file empties the Song and Album collection and inserts new records in both

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/bandwagon"
);


// album:
// art: ["http://bandwagon.s3.amazonaws.com/5ebc496bb753b4de04d28e22-test%20art%202.jpg"]
// createdAt: "2020-05-15T15:00:44.434Z"
// description: "testy testy test"
// song_ids: (2) [{…}, {…}]
// title: "testy album"
// updatedAt: "2020-05-15T15:00:44.434Z"
// user: {_id: "5ebc495a25c3434f90f856b1", name: "Daria Naumova", email: "daria.naumova13@gmail.com", role: "artist", paymentRequired: "false"}
// __v: 0
// _id: "5ebeae9cd34f1c2378589592"
// __proto__: Object
// albumId: "5ebeae9cd34f1c2378589592"
// count_play: 0
// createdAt: "2020-05-15T15:01:58.543Z"
// fileUrl: "http://bandwagon.s3.amazonaws.com/5ebc496bb753b4de04d28e22-11-Philip_Glass-Secret_agent.mp3"
// title: "11"
// token_earned: 0
// updatedAt: "2020-05-15T15:02:27.513Z"
// user: {_id: "5ebc495a25c3434f90f856b1", name: "Daria Naumova", email: "daria.naumova13@gmail.com", role: "artist", paymentRequired: "false"}
// __v: 0
// _id: "5ebeaee6d34f1c2378589594"

const songSeed = [
  {
    albumId: "",
    title: "",
    fileUrl: "",
    description : "",
    token_earned: "",
    count_play: "",
    album: "",
    date: new Date(Date.now())
  },
];

const albumSeed = [
  {
    title: "",
    art: "",
    song_ids: [],
    description : "",
    date: new Date(Date.now())
  },
  {
    title: "",
    art: "",
    song_ids: [],
    description : "",
    date: new Date(Date.now())
  },
  {
    title: "",
    art: "",
    song_ids: [],
    description : "",
    date: new Date(Date.now())
  },
  {
    title: "",
    art: "",
    song_ids: [],
    description : "",
    date: new Date(Date.now())
  }
];


Song
  .remove({})
  .then(() => Song.collection.insertMany(songSeed))
  .then(data => {
    console.log(data.result.n + " songs inserted!");
Album
  .remove({})
  .then(() => Album.collection.insertMany(albumSeed))
  .then(data => {
    console.log(data.result.n + " albums inserted!");
    process.exit(0);
  })
})
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
