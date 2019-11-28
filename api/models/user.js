const Sequelize = require("sequelize");
const { sequelize } = require("../db/sequelize");

const User = sequelize.define("user", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
        type: Sequelize.DATE,
    }
});

module.exports = { User };