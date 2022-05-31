'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Bookings', 'token', {
			type: Sequelize.STRING,
			after: 'timeType',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Bookings', 'token');
	},
};
