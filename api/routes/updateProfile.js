var express = require("express");
var router = express.Router();

/* POST home page. */
router.get("/", function(req, res, next) {
    res.send("Hi to the Api server");
});

module.exports = router;
