const router = require("express").Router();
const albumRoutes = require("./albums");
const songRoutes = require("./songs");
const authRoutes = require('./auth')
const userRoutes = require('./user')
const artistRoutes = require('./artist')

router.use("/songs", songRoutes);
router.use("/albums", albumRoutes);
router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/artist", artistRoutes);

module.exports = router;