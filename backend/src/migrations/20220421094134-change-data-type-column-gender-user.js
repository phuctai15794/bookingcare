'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Users', 'gender', {
			type: Sequelize.DataTypes.STRING,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn('Users', 'gender', {
			type: Sequelize.DataTypes.BOOLEAN,
		});
	},
};
