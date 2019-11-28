var express = require("express");
var router = express.Router();

var multer = require("multer");
var upload = multer({ dest: "uploads/recordings" }).single("INPUT-FIELD-NAME-HERE");

/* POST to upload audio. */
router.post("/", function(req, res, next) {
    upload(req, res, function(err) {
		console.log(`File info: ${req.file}`);
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.status(500).send({ flag: false, error: err });
            return;
        } else if (err) {
            // An unknown error occurred when uploading.
            res.status(400).send({ flag: false, error: err });
            return;
        }
        // Everything went fine.
        res.send({ flag: true });
    });
});

module.exports = router;
