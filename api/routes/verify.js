const express = require("express");
const router = express.Router();

const { handleJWTVerification } = require("../middleware");

router.get("/", handleJWTVerification, function(req, res, next) {
    res.send();
})

module.exports = router;