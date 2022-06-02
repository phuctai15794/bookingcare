'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Specialties', 'contentMarkdown', {
			type: Sequelize.TEXT,
			after: 'contentHTML',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Specialties', 'contentMarkdown');
	},
};
