'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
	up: (queryInterface, Sequelize) => {
	  return queryInterface.bulkInsert('Users', [
		{
			firstName: 'admin',
			lastName: 'admin',
			email: 'admin@weCreate.com',
			password: bcryptjs.hashSync('admin', 8),
			roleId: 1,
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			firstName: 'John',
			lastName: 'Michael',
			email: 'test@yahoo.com',
			password: bcryptjs.hashSync('tester', 8),
			roleId: 2,
			createdAt: new Date(),
			updatedAt: new Date()
		}
	  ], {});
	},
	down: (queryInterface, Sequelize) => {
	  return queryInterface.bulkDelete('Users', null, {});
	}
};
