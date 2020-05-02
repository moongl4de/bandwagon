const router = require("express").Router();
const songRoutes = require("./songs");
const authRoutes = require('./auth')

router.use("/songs", songRoutes);
router.use("/", authRoutes);


module.exports = router;