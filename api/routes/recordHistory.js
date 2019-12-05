var express = require("express");
var router = express.Router();

const datetime = require("date-and-time");

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
    })
        .then(recordings => {
            const result = [];
            recordings.map(x => {
                result.push({
                    id: x.id,
                    comment: x.comment,
                    createdAt: datetime.format(
                        x.createdAt,
                        "YYYY/MM/DD HH:mm:ss"
                    )
                });
            });

            if (recordingList.length === 0) {
                res.send({
                    flag: false,
                    recordings: result
                });
            } else {
                res.send({
                    flag: true,
                    recordings: result
                });
            }
        })
        .catch(err => {
            res.status(404).send({ flag: false, error: err });
        });
});

module.exports = router;
