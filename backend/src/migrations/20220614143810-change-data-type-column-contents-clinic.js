'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Clinics', 'contentHTML', {
			type: Sequelize.DataTypes.TEXT('long'),
		});
		await queryInterface.changeColumn('Clinics', 'contentMarkdown', {
			type: Sequelize.DataTypes.TEXT('long'),
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Clinics', 'contentHTML', {
			type: Sequelize.DataTypes.TEXT,
		});
		await queryInterface.changeColumn('Clinics', 'contentMarkdown', {
			type: Sequelize.DataTypes.TEXT,
		});
	},
};
