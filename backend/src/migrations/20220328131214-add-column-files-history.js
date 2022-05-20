'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Histories', 'files', {
			type: Sequelize.TEXT,
			after: 'description',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Histories', 'files');
	},
};
