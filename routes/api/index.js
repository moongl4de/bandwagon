const router = require("express").Router();
const albumRoutes = require("./albums");
const authRoutes = require('./auth')

router.use("/albums", albumRoutes);
router.use("/", authRoutes);


module.exports = router;