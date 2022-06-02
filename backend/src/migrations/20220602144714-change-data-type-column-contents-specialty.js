'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Specialties', 'contentHTML', {
			type: Sequelize.DataTypes.TEXT('long'),
		});
		await queryInterface.changeColumn('Specialties', 'contentMarkdown', {
			type: Sequelize.DataTypes.TEXT('long'),
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Specialties', 'contentHTML', {
			type: Sequelize.DataTypes.TEXT,
		});
		await queryInterface.changeColumn('Specialties', 'contentMarkdown', {
			type: Sequelize.DataTypes.TEXT,
		});
	},
};
