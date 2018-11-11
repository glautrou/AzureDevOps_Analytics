var express = require("express");
var router = express.Router();
var config = require("../config");

/* GET applications listing. */
router.get("/", function(req, res, next) {
  res.json({ url: config.get("sonar.url") });
});

module.exports = router;
