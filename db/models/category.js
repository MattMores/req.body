"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      title: DataTypes.STRING(50),
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Category.associate = function (models) {
    Category.belongsTo(models.User, { foreignKey: "userId" });
    Category.hasMany(models.Task, { foreignKey: "categoryId" });
  };
  return Category ;
};
