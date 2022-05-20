'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Users', 'roleId', {
			type: Sequelize.STRING,
			after: 'id',
		});

		await queryInterface.addColumn('Users', 'address', {
			type: Sequelize.STRING,
			after: 'email',
		});

		await queryInterface.addColumn('Users', 'gender', {
			type: Sequelize.BOOLEAN,
			after: 'address',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Users', 'roleId');
		await queryInterface.removeColumn('Users', 'address');
		await queryInterface.removeColumn('Users', 'gender');
	},
};
