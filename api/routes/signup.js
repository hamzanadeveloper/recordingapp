var express = require("express");
var router = express.Router();

const { User } = require("../models/user");

/* POST signup. */
router.post("/", function(req, res, next) {
    const email = req.body.email;
	const password = req.body.password;
	const gender = req.body.gender;
	const birthday = req.body.birthday;

    User.create({
        email: email,
		password: password,
		gender: gender,
		birthday: birthday // Format example: "2000-01-21"
    })
        .then(result => {
            console.log(`Created user ${email}`);
            res.send({ flag: true, user: result });
        })
        .catch(err => {
            console.error(`Create user error ${err}`);
            res.status(400).send({ flag: false, error: err });
        });
});

module.exports = router;
