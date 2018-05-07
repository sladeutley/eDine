"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    { tableName: "users" }
  );
  User.associate = function(models) {
    // associations can be defined here
    // User.belongsToMany(models.User, {
    //   though: {
    //     model: 'userFollow',
    //     unique: false
    //   },
    //   foreignKey: "followerId",
    //   constraints: false
    // });
    // User.belongsToMany(models.User, {
    //   though: {
    //     model: 'userFollow',
    //     unique: false
    //   },
    //   foreignKey: "followeeId",
    //   constraints: false
    // });
  };
  return User;
};
