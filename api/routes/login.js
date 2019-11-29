var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");

const { User } = require("../models/user");
const { createJWT } = require("../libs/auth");

/* POST login. */
router.post("/", function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(400).send({ flag: false });
        return;
    }

    User.findOne({
        where: { email: email }
    })
        .then(user => {
            // check whether the email is present in the db
            if (user === null) {
                console.log(`user is null. `);
                res.status(404).send({ flag: false });
                return;
            }
            console.log(`user ${email} exist!`);

            // TODO CHECK PASSWORD
            bcrypt.compare(password, user.password, (err, isSame) => {
                if (isSame) {
                    res.send({ flag: true, user: user });
                } else {
                    res.status(400).send({ flag: false });
                }
            });
        })
        .catch(err => {
            res.status(500).send({ flag: false, error: err });
        });
});

module.exports = router;
