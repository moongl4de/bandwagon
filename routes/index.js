const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api", apiRoutes);


// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      process.env.NODE_ENV === 'production' ?
      '../client/build/index.html' :
      '../client/public/index.html'
    )
  );
});

module.exports = router;
