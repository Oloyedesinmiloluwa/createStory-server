'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Stories', [{
		userId: 2,
		summary: '1st story created by 2',
		description: 'dummy desc',
		type: 'enhancement',
		complexity: 'high',
		estimatedHrs: 1,
		cost: 100,
		status: null,
		createdAt: new Date(),
		updatedAt: new Date()
		},
		{
		userId: 2,
		summary: '1st story created by 2',
		description: 'dummy desciption without end of discussion this also will pass thanks',
		type: 'enhancement',
		complexity: 'high',
		estimatedHrs: 1,
		cost: 100,
		createdAt: new Date(),
		updatedAt: new Date(),
		status: null,

		}], {});
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete('Stories', null, {});
    
  }
};
