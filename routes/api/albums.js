const router = require("express").Router();
const albumController = require("../../controllers/albumController");
// const Song = require('../../models/songs')
// const User = require('../../models/user')
// const mongoose = require('mongoose')


// router
//   .route("/upload")
//   .post(albumController.create);


  router
  .route("/")
  .get(albumController.findAll)
  .put(albumController.update)
  .post(albumController.create);

  router
  .route("/:id")
  .get(albumController.findById)

  router
  .route("/userId/:id")
  .get(albumController.findByUserId)

  // router
  // .route("/songs")
  // .post(albumController.insert);

// router.post('/user', (req, res) => {
//   User.create(req.body)
//     .then(dbModel => {
//       res.json(dbModel);
//     })
//     .catch(err => res.status(422).json(err.message));
// })

// router.post('/', (req, res) => {
//   Song.create(req.body)
//     .then(dbModel => {
//       res.json(dbModel);
//     })
//     .catch(err => res.status(422).json(err.message));
// })

// router.get('/', (req, res) => {
//   Song.find().populate('user')
//     .then(dbModel => {
//       res.json(dbModel);
//     })
//     .catch(err => res.status(422).json(err.message));
// })


// router.put('/', (req, res) => {
//   console.log("backend hit", req.body)
//   User.find({
//       email: req.body.email
//     })
//     .then(dbUser => {
//       console.log(dbUser)
//       Song.findOneAndUpdate({
//           "user._id" : dbUser._id
//         }, {
//           fileUrl: req.body.url
//         }, {
//           new: true
//         })
//         // .populate('user')
//         .then(dbModel => {
//           console.log(dbModel)
//           res.json(dbModel);
//         })
//         .catch(err => {
//           console.log(err.message)
//           res.status(422).json(err.message)
//         });
//     })
// });



module.exports = router;