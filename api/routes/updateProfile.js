var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");

const { User } = require("../models/user");

/* PATCH update profile */
router.patch("/password", function(req, res, next) {
    const newPassword = req.body.password;
    const userId = req.body.userId; // !!!!!!!!TODO!!!!!!!!! CHANGE THIS TO JWT MIDDLEWARE INSTEAD OF BODY

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

router.patch("/birthday", function(req, res, next) {
    const newBirthday = req.body.birthday;
    const userId = req.body.userId; // !!!!!!!!TODO!!!!!!!!! CHANGE THIS TO JWT MIDDLEWARE INSTEAD OF BODY

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

router.patch("/gender", function(req, res, next) {
    const newGender = req.body.gender;
    const userId = req.body.userId; // !!!!!!!!TODO!!!!!!!!! CHANGE THIS TO JWT MIDDLEWARE INSTEAD OF BODY

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
