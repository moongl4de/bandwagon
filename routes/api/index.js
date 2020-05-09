const router = require("express").Router();
const albumRoutes = require("./albums");
const authRoutes = require('./auth')
const userRoutes = require('./user')

router.use("/albums", albumRoutes);
router.use("/", authRoutes);
router.use("/user", userRoutes);

module.exports = router;