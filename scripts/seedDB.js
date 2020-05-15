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
    title: "Scummy",
    fileUrl: "https://bandwagon.s3.us-east-2.amazonaws.com/5eb603c44a8f7d382e190160-Artic+Monkeys+-+Scummy.mp3",
    token_earned: "",
    count_play: "",
    album_art:"https://bandwagon.s3.us-east-2.amazonaws.com/5eb4c005b548d000cce424a6-21840_871076493610_6174613_n.jpg",
    album: "",
    date: new Date(Date.now())
  },
  {
    albumId: "",
    title: "Amber",
    fileUrl: "https://bandwagon.s3.us-east-2.amazonaws.com/5eb603c44a8f7d382e190160-311+-+Amber.mp3",
    token_earned: "",
    count_play: "",
    album_art:"https://bandwagon.s3.us-east-2.amazonaws.com/5eb4c005b548d000cce424a6-21840_871076493610_6174613_n.jpg",
    album: "",
    date: new Date(Date.now())
  },
  {
    albumId: "",
    title: "Can I Get A Witness",
    fileUrl: "https://bandwagon.s3.us-east-2.amazonaws.com/5eb603c44a8f7d382e190160-SonReal+-+Can+I+Get+A+Witness+(Official).mp3",
    token_earned: "",
    count_play: "",
    album_art:"https://bandwagon.s3.us-east-2.amazonaws.com/5eb4c005b548d000cce424a6-21840_871076493610_6174613_n.jpg",
    album: "",
    date: new Date(Date.now())
  },
  {
    albumId: "",
    title: "Secret agent",
    fileUrl: "https://bandwagon.s3.us-east-2.amazonaws.com/5eb4dc06ee901d08e55cdc80-11-Philip_Glass-Secret_agent.mp3",
    token_earned: "",
    count_play: "",
    album_art:"https://bandwagon.s3.us-east-2.amazonaws.com/5eb4c005b548d000cce424a6-21840_871076493610_6174613_n.jpg",
    album: "",
    date: new Date(Date.now())
  },
  {
    albumId: "",
    title: "That's Life",
    fileUrl: "https://bandwagon.s3.us-east-2.amazonaws.com/5eb603c44a8f7d382e190160-Skrizzly+Adams+-+That's+Life+(Official+Audio).mp3",
    token_earned: "",
    count_play: "",
    album_art:"https://bandwagon.s3.us-east-2.amazonaws.com/5eb4c005b548d000cce424a6-21840_871076493610_6174613_n.jpg",
    album: "",
    date: new Date(Date.now())
  },
  {
    albumId: "",
    title: "First Snow",
    fileUrl: "https://bandwagon.s3.us-east-2.amazonaws.com/5ebc56283ec18b5728baf99c-09+-+firstsnow.mp3",
    token_earned: "",
    count_play: "",
    album_art:"https://bandwagon.s3.us-east-2.amazonaws.com/5eb4c005b548d000cce424a6-21840_871076493610_6174613_n.jpg",
    album: "",
    date: new Date(Date.now())
  },
  ];

const albumSeed = [
  {
    title: "Bandwagon's First",
    art: "https://bandwagon.s3.us-east-2.amazonaws.com/5eb4c005b548d000cce424a6-21840_871076493610_6174613_n.jpg",
    song_ids: [],
    description : "Thanks for listening!",
    date: new Date(Date.now())
  },
];


// Song
//   .remove({})
//   .then(() => Song.collection.insertMany(songSeed))
//   .then(data => {
//     console.log(data.result.n + " songs inserted!");
// Album
//   .remove({})
//   .then(() => Album.collection.insertMany(albumSeed))
//   .then(data => {
//     console.log(data.result.n + " albums inserted!");
//     process.exit(0);
//   })
// })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

let albumIds;
let songIds;

function updateAlbum(albumIds, songIds) {
  const updatePromises = albumIds.map(albumId => {
    return songIds.map(songId => {
      return db.Body.findOneAndUpdate(
        { _id: albumId },
        { $push: { song_ids: songIds } },
        { new: true }
      )
        .then(result => {
          return result;
        })
        .catch(err => {
          console.log('Error: ', err.message);
          process.exit(1);
        });
    });
  });

  Promise.all(updatePromises.flat(1)).then(results => {
    console.log('results', results, '\n');
    process.exit(0);
  });
}

Album.deleteMany({})
  .then(() => Album.collection.insertMany(albumSeed))
  .then(data => {
    const albumPromises = data.ops.map(album => {
      return album._id;
    });

    Promise.all(albumPromises)
      .then(ids => {
        albumIds = ids;
      })
      .then(() => {
        Song.deleteMany({})
          .then(() => Song.collection.insertMany(songSeed))
          .then(data => {
            const songPromises = data.ops.map(song => {
              return song._id;
            });

            Promise.all(songPromises)
              .then(ids => {
                songIds = ids;
              })
              .then(() => {
                updateAlbum(albumIds, songIds);
              });
          });
      });
  });
