"use strict";
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define(
    "Review",
    {
      restaurantAPI_id: DataTypes.STRING,
      review_description: DataTypes.STRING,
      star_rating: DataTypes.INTEGER,
      location: DataTypes.STRING
    },
    { tableName: "reviews" }
  );
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {
      foreignKey: "user_id"
    });
  };
  return Review;
};
