'use strict';
module.exports = (sequelize, DataTypes) => {
  var userFollow = sequelize.define('userFollow', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  }, {});
  userFollow.associate = function(models) {
    // associations can be defined here
  };
  return userFollow;
};