const Sequelize = require("sequelize");
const { sequelize } = require("../db/sequelize");

const bcrypt = require('bcryptjs')

const User = sequelize.define("user", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.ENUM,
        values: ["male", "female"]
    },
    birthday: {
        type: Sequelize.DATE
    }
});

User.addHook("beforeCreate", (user, options) => {
    // generate salt and hash the password
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                user.password = hash
                return resolve(user, options);
            })
        })
    })
});

module.exports = { User };
