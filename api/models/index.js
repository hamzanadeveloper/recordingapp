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
    gender: {
        type: Sequelize.ENUM,
        values: ["male", "female"]
    }
});

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

sequelize
	.sync(
		{ force: true } // This command will drop the table and re-create it.
	)
	.then(
		function(err) {
			console.log("***** Tables are created *****");
		},
		function(err) {
			console.log("An error occurred while creating the table:", err);
		}
	);

module.exports = { User, Recording };
