'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Clinics', 'name', {
			type: Sequelize.STRING,
			after: 'id',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Clinics', 'name');
	},
};
