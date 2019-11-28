const Sequelize = require("sequelize");
const { sequelize } = require("../db/sequelize");

const { User } = require("./user");

const Recording = sequelize.define("recording", {
	url: {
		type: Sequelize.STRING,
		allowNull: false
	},
	comment: {
		type: Sequelize.STRING,
		allowNull: false
	},
	userId: {
	    type: Sequelize.INTEGER,
	    references: {
	        // This is a reference to another model
	        model: User,

	        // This is the column name of the referenced model
	        key: "id",

	        // This declares when to check the foreign key constraint. PostgreSQL only.
	        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	    }
	}
});

module.exports = { Recording };