const config = require("../config.json");
// add database connection
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.db.database, // database
    config.db.username, // username
    config.db.password, // password
    config.db.options
);

sequelize.authenticate().then(
    function(err) {
        console.log("Connection has been established successfully.");
    },
    function(err) {
        console.log("Unable to connect to the database:", err);
    }
);

module.exports = { sequelize }; // Export the active connection.
