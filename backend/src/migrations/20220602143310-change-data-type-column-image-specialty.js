'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Specialties', 'image', {
			type: Sequelize.DataTypes.BLOB('long'),
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Specialties', 'image', {
			type: Sequelize.DataTypes.STRING,
		});
	},
};
