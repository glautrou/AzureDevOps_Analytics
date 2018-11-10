var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.json([{ name: "Application 1" }, { name: "Application 2" }]);
});

router.get("/:applicationId", function(req, res, next) {
  var id = req.params.applicationId;
  res.json({ name: `Application {id}` });
});

module.exports = router;
