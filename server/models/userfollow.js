'use strict';
module.exports = (sequelize, DataTypes) => {
  var userFollow = sequelize.define('userFollow', {
    id: DataTypes.INTEGER
  }, {});
  userFollow.associate = function(models) {
    // associations can be defined here
  };
  return userFollow;
};