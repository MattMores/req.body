"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      details: {
        type: Sequelize.TEXT,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "Categories" },
      },
      completed: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      public: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      due: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Tasks");
  },
};
