'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Schedules', 'date', {
			type: Sequelize.DataTypes.INTEGER,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Schedules', 'date', {
			type: Sequelize.DataTypes.DATE,
		});
	},
};
