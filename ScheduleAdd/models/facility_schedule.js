'use strict';
module.exports = function(sequelize, DataTypes) {
  var facility_schedule = sequelize.define('facility_schedule', {
		id: {
			type:DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: DataTypes.TEXT,
		facilityID: {
			allowNull: false,
			DataTypes.INTEGER,
		},
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
  return facility_schedule;
};
