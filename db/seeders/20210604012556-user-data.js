"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "CodyGotGainz",
          email: "codyGotGainz@gmail.com",
          firstName: "Cody",
          lastName: "Brown",
          hashedPassword: "cb123",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "CalfForDays",
          email: "MattCalfs@gmail.com",
          firstName: "Matt",
          lastName: "Mores",
          hashedPassword: "mm123",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "JustinBeDustin",
          email: "JustinWithTheSmokes@gmail.com",
          firstName: "Justin",
          lastName: "Sung",
          hashedPassword: "js123",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "RellKBells",
          email: "KettleBellGainz@gmail.com",
          firstName: "Torrell",
          lastName: "Rodriguez",
          hashedPassword: "tr123",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
