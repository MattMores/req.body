'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    hashedPassword: DataTypes.STRING.BINARY
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
