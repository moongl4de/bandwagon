const router = require("express").Router();
const albumRoutes = require("./albums");
const authRoutes = require('./auth')
const userRoutes = require('./user')
const artistRoutes = require('./artist')

router.use("/albums", albumRoutes);
router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/artist", artistRoutes);

module.exports = router;