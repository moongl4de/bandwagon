const router = require("express").Router();
const songsController = require("../../controllers/songsController");
const Song = require('../../models/songs')
const User = require('../../models/user')
const mongoose = require('mongoose')

router.post('/user', (req, res) => {
  User.create(req.body)
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(err => res.status(422).json(err.message));
})

router.post('/', (req, res) => {
  Song.create(req.body)
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(err => res.status(422).json(err.message));
})

router.get('/', (req, res) => {
  Song.find().populate('user')
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(err => res.status(422).json(err.message));
})


router.put('/', (req, res) => {
  console.log("backend hit", req.body)
  User.find({
      email: req.body.email
    })
    .then(dbUser => {
      console.log(dbUser)
      Song.findOneAndUpdate({
          "user._id" : dbUser._id
        }, {
          fileUrl: req.body.url
        }, {
          new: true
        })
        // .populate('user')
        .then(dbModel => {
          console.log(dbModel)
          res.json(dbModel);
        })
        .catch(err => {
          console.log(err.message)
          res.status(422).json(err.message)
        });
    })
});

// Matches with "/api/songs"
// router
//   .route("/")
//   .get(songsController.findAll)
//   .post(songsController.create);

// // Matches with "/api/songs/:id"
// router
//   .route("/:id")
//   .get(songsController.findById)
//   .put(songsController.update)
//   .delete(songsController.remove);

module.exports = router;