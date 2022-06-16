'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Users', 'medicalReason', {
			type: Sequelize.STRING,
			after: 'password',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Users', 'medicalReason');
	},
};
