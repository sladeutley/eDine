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
    User.hasMany(models.Review, {
      foreignKey: "user_id"
    });
    User.belongsToMany(models.User, {
      through: "userFollow",
      as: "userFollows",
      foreignKey: "followerId",
      onDelete: "CASCADE", //might not need this
      constraints: false
    });
    User.belongsToMany(models.User, {
      through: "userFollow",
      as: "userFollowed",      
      foreignKey: "followeeId",
      onDelete: "CASCADE",       
      constraints: false
    });
  };
  return User;
};
