'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Clinics', 'image', {
			type: Sequelize.DataTypes.BLOB('long'),
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Clinics', 'image', {
			type: Sequelize.DataTypes.STRING,
		});
	},
};
