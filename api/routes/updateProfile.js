var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");

const { User } = require("../models/user");
const { handleJWTVerification } = require("../middleware");

/* GET profile info */
router.get("/", handleJWTVerification, function(req, res) {
    const userId = req.user.id;

    if (!userId) {
        res.status(403).send({ flag: false });
        return;
    }

    User.findByPk(userId)
        .then(user => {
            res.send({
                flag: true,
                user: { email: email, gender: user.gender, birthday: user.birthday }
            });
        })
        .catch(err => {
            res.status(404).send({ flag: false, error: err });
        });
});

/* PATCH update profile */
router.patch("/password", handleJWTVerification, function(req, res, next) {
    const newPassword = req.body.password;
    const userId = req.user.id;

    if (!newPassword || !userId) {
        res.status(400).send({ flag: false });
        return;
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPassword, salt, (err, hash) => {
            User.update({ password: hash }, { where: { id: userId } })
                .then(updatedResult => {
                    res.send({ flag: true, update: updatedResult });
                })
                .catch(err => {
                    res.status(404).send({ flag: false, error: err });
                });
        });
    });
});

router.patch("/birthday", handleJWTVerification, function(req, res, next) {
    const newBirthday = req.body.birthday;
    const userId = req.user.id;

    if (!newBirthday || !userId) {
        res.status(400).send({ flag: false });
        return;
    }

    User.update({ birthday: newBirthday }, { where: { id: userId } })
        .then(updatedResult => {
            res.send({ flag: true, update: updatedResult });
        })
        .catch(err => {
            res.status(404).send({ flag: false, error: err });
        });
});

router.patch("/gender", handleJWTVerification, function(req, res, next) {
    const newGender = req.body.gender;
    const userId = req.user.id;

    if (!newGender || !userId) {
        res.status(400).send({ flag: false });
        return;
    }

    User.update({ gender: newGender }, { where: { id: userId } })
        .then(updatedResult => {
            res.send({ flag: true, update: updatedResult });
        })
        .catch(err => {
            res.status(404).send({ flag: false, error: err });
        });
});

module.exports = router;
