'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.renameColumn('Specialties', 'description', 'contentHTML');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.renameColumn('Specialties', 'contentHTML', 'description');
	},
};
