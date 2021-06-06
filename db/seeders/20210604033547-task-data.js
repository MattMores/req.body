"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Tasks",
      [
        {
          userId: "1",
          title: "running",
          details: "go running for 45 minutes",
          categoryId: "1",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "1",
          title: "deadlift",
          details: "deadlift 150lbs 4sets of 12",
          categoryId: "2",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "1",
          title: "stretch",
          details: "do a full body stretch for 15minutes",
          categoryId: "3",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "1",
          title: "alternative single leg squats",
          details: "slowly squat on one leg while holding arms out for balance 10reps per leg 4 sets",
          categoryId: "4",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "2",
          title: "Swimming",
          details: "go swimming for 45 minutes",
          categoryId: "5",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "2",
          title: "HIIT",
          details: "Jump lunges, high knees, jump squats for 20 minutes. one minute per exercise 5 rounds ",
          categoryId: "6",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "2",
          title: "full-body stretch",
          details: "stretch for 15 minutes",
          categoryId: "7",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "2",
          title: "yoga class",
          details: "teach class Vinyasa yoga",
          categoryId: "8",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "3",
          title: "biking",
          details: "go biking for 45 minutes",
          categoryId: "9",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "3",
          title: "Hollow rock tossing",
          details: "grab 5lbs 10lbs and 15lb medicine ball and bounce it off the wall while sitting to rock back upon catching",
          categoryId: "10",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "3",
          title: "full-body stretch",
          details: "stretch for 15 minutes",
          categoryId: "11",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "3",
          title: "shouler press and dumbbell curl",
          details: "progressive overload with lightweight current limit and challenge weight to create new limit",
          categoryId: "12",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "4",
          title: "burpee",
          details: "do 200 burpees",
          categoryId: "13",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "4",
          title: "8 inner gates",
          details: "perform squats, dumbbell curls, fisherman carry, tricep extends, plank, mountain climbers, weighted calf-raises, shoulder press/shrug",
          categoryId: "14",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "4",
          title: "full-body stretch",
          details: "stretch for 20 minutes",
          categoryId: "15",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: "4",
          title: "shouler press and dumbbell curl",
          details: "progressive overload with lightweight current limit and challenge weight to create new limit",
          categoryId: "16",
          completed: "false",
          public: "false",
          due: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tasks", null, {});
  },
};
