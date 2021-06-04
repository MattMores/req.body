"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          title: "Cardio",
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
          title: "Stretching",
          userId: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Balance Training",
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
          title: "Endurance Training",
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
          title: "yoga",
          userId: "4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Cardio",
          userId: "5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Gymnastics",
          userId: "5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Stretching",
          userId: "5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Strength Training",
          userId: "5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Cardio",
          userId: "6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Full-Body Training",
          userId: "6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Stretching",
          userId: "6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Endurance Training",
          userId: "6",
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
