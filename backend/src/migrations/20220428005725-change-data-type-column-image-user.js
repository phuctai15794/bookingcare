'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Users', 'image', {
			type: Sequelize.DataTypes.BLOB,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Users', 'image', {
			type: Sequelize.DataTypes.STRING,
		});
	},
};
