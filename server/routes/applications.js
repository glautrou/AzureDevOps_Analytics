var express = require("express");
var router = express.Router();

/* GET applications listing. */
router.get("/", function(req, res, next) {
  res.json([{ name: "Application 1" }, { name: "Applicztion 2" }]);
});

module.exports = router;
