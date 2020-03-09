'use strict';
module.exports = (sequelize, DataTypes) => {
  var Story = sequelize.define('Story', {
    summary: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    complexity: DataTypes.STRING,
    estimatedHrs: DataTypes.STRING,
	cost: DataTypes.DECIMAL,
	dateAccepted: DataTypes.DATE,
	dateRejected: DataTypes.DATE,
	userId: DataTypes.INTEGER,
	status: DataTypes.BOOLEAN,
  }, {});
  Story.associate = function(models) {
	// associations can be defined here
	Story.belongsTo(models.User, {as: 'user'})
  };
  return Story;
};
