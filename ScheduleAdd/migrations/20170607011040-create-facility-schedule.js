'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('facility_schedules', {
			id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
				allowNull: false,
        type: Sequelize.TEXT
      },
      facilityID: {
				allowNull: false,
        type: Sequelize.INTEGER
      },
      desknetsId: {
				allowNull: false,
        type: Sequelize.INTEGER
      },
      start: {
        allowNull: false,
        type: Sequelize.DATE
      },
      end: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('facility_schedules');
  }
};
