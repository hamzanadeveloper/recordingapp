// add database connection
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    "SickKids", // database
    "postgres", // username
    "0192837465", // password
    {
        host: 'localhost',
        dialect: "postgres", // or 'sqlite', 'postgres', 'mariadb'
        // port: 5432 // or 5432 (for postgres)
    }
);

sequelize.authenticate().then(
    function(err) {
        console.log("Connection has been established successfully.");
    },
    function(err) {
        console.log("Unable to connect to the database:", err);
    }
);

module.exports = { sequelize }  // Export the active connection.