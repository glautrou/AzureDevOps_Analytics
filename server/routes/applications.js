var express = require("express");
var router = express.Router();

/* GET applications listing. */
router.get("/", function(req, res, next) {
  res.json([
    { id: "1", name: "Application 1" },
    { id: "2", name: "Applicztion 2" }
  ]);
});

module.exports = router;
