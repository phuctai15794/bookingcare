'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Clinics', 'contentMarkdown', {
			type: Sequelize.TEXT,
			after: 'contentHTML',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Clinics', 'contentMarkdown');
	},
};
