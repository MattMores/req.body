"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING(50),
      details: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
      completed: DataTypes.BOOLEAN,
      public: DataTypes.BOOLEAN,
      due: DataTypes.DATE,
    },
    {}
  );
  Task.associate = function (models) {
    Task.belongsTo(models.User, { foreignKey: "userId" });
    Task.belongsTo(models.Category, { foreignKey: "categoryId" });
  };
  return Task;
};
