// add database connection
const Sequelize = require("sequelize");

let sequelize = null;
if (process.env.DATABASE_URL) {
    const urlPart = process.env.DATABASE_URL.split("@")[1];
    const [ url, dbName ] = urlPart.split("/");
    const [ host, port ] = url.split(":");
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        protocol: "postgres",
        host: host,
        port: port
    })
} else {
    const config = require("../config.json");
    sequelize = new Sequelize(
        config.db.database, // database
        config.db.username, // username
        config.db.password, // password
        config.db.options
    );
}

sequelize.authenticate().then(
    function(err) {
        console.log("Connection has been established successfully.");
    },
    function(err) {
        console.log("Unable to connect to the database:", err);
    }
);

module.exports = { sequelize }; // Export the active connection.
