var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");

const { User } = require("../models/user");
const { Recording } = require("../models/recording");
const { handleJWTVerification } = require("../middleware");

/* GET profile info */
router.get("/", handleJWTVerification, function(req, res) {
    console.log(req.user);
    console.log(req.user.id);
    const userId = req.user.id;

    if (!userId) {
        res.status(403).send({ flag: false });
        return;
    }

    Recording.findAll({
        where: { userId: userId }
    }).then(recordings => {
            recordingList = [];
            recordings.map( record => {recordingList.push({id: record.id, comment: record.comment, time: record.createdAt})})
            console.log(recordingList)
            if (recordingList.length === 0) {
                res.send({
                    flag: false,
                    recordings: recordingList
                });
            }
            res.send({
                flag: true,
                recordings: recordingList
            });
        })
        .catch(err => {
            res.status(404).send({ flag: false, error: err });
        });
});

module.exports = router;