'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});

  User.associate = function(models) {
  	// Adds roleId to User model
	User.belongsTo(models.Role, {as: 'role'})
  };
  return User;
};
