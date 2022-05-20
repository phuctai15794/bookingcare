'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Users', 'roleId', {
			type: Sequelize.STRING,
			after: 'id',
		});

		await queryInterface.addColumn('Users', 'positionId', {
			type: Sequelize.STRING,
			after: 'roleId',
		});

		await queryInterface.addColumn('Users', 'phone', {
			type: Sequelize.STRING,
			after: 'gender',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Users', 'roleId');
		await queryInterface.removeColumn('Users', 'positionId');
		await queryInterface.removeColumn('Users', 'phone');
	},
};
