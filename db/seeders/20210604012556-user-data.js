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
          hashedPassword:
            "$2a$12$BQ1O1QLUvGiobGdnrgK/eeYbQLV8v5eFGRK.rhCV5f1ZNS9jCiTJK",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "CalfForDays",
          email: "MattCalfs@gmail.com",
          firstName: "Matt",
          lastName: "Mores",
          hashedPassword:
            "$2a$12$FWTfLb3WNgBgWUT0rhoDYeVSQ2rUgsYK99r.bjvGpuOHGv6Fn.W0G",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "JustinBeDustin",
          email: "JustinWithTheSmokes@gmail.com",
          firstName: "Justin",
          lastName: "Sung",
          hashedPassword:
            "$2a$12$JL/Euq/tbzy8bOHoRM76QuPCdXS1W5ZqC/ycB/T4EuPR6/fjVNTea",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "RellKBells",
          email: "KettleBellGainz@gmail.com",
          firstName: "Torrell",
          lastName: "Rodriguez",
          hashedPassword:
            "$2a$12$E9vCWFTFOgwYV/8dvtFd.e9fpN8x/R9XSOG0PEuvva4q/JXqkSDxy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
