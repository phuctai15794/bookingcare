'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.renameColumn('Clinics', 'description', 'contentHTML');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.renameColumn('Clinics', 'contentHTML', 'description');
	},
};
