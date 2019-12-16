// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const audio = sequelizeClient.define('audio', {

    file_url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    file_type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content_uri: {
      type: Sequelize.BLOB,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    user_id: {
      type: Sequelize.UUID,
    }

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  audio.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return audio;
};
