'use strict';
module.exports = function(sequelize, DataTypes) {
  var Scheduler = sequelize.define('Scheduler', {
    id: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: DataTypes.TEXT,
    facilityID: DataTypes.INTEGER,
    desknetsId: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE,

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Scheduler;
};
