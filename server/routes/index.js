"use strict";

const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

// piping other requests through the route module
router.use(require("./authRoute"));
router.use(require("./googlePlacesAPIRoute"));

module.exports = router;
