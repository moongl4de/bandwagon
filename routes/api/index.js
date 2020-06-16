const router = require("express").Router();
const albumRoutes = require("./albums");
const songRoutes = require("./songs");
const authRoutes = require('./auth')
const userRoutes = require('./user')
const artistRoutes = require('./artist')
const checkoutRoutes = require('./checkout')

router.use("/songs", songRoutes);
router.use("/albums", albumRoutes);
router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/artist", artistRoutes);
router.use("/checkout", checkoutRoutes);

module.exports = router;