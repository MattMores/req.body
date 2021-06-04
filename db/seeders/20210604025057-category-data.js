"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          title: "Cardio",
          userId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Strength Training",
          userId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Stretching",
          userId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Balance Training",
          userId: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Cardio",
          userId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Endurance Training",
          userId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Stretching",
          userId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "yoga",
          userId: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Cardio",
          userId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Gymnastics",
          userId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Stretching",
          userId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Strength Training",
          userId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Cardio",
          userId: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Full-Body Training",
          userId: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Stretching",
          userId: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Endurance Training",
          userId: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
