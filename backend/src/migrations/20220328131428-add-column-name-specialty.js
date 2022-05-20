'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Specialties', 'name', {
			type: Sequelize.STRING,
			after: 'id',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Specialties', 'name');
	},
};
