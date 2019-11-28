const Sequelize = require("sequelize");
const { sequelize } = require("../db/sequelize");

const User = sequelize.define("user", {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // gender: {
    //     type: Sequelize.ENUM,
    //     values: ["male", "female"]
    // }
});

sequelize
    .sync(
        { force: true } // This command will drop the table and re-create it.
    )
    .then(
        function(err) {
            console.log("User table is working.");
        },
        function(err) {
            console.log("An error occurred while creating the table:", err);
        }
    );

module.exports = { User };
