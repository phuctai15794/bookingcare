'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Users', 'typeRole');
		await queryInterface.removeColumn('Users', 'keyRole');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('Users', 'typeRole', {
			type: Sequelize.STRING,
			after: 'id',
		});

		await queryInterface.addColumn('Users', 'keyRole', {
			type: Sequelize.STRING,
			after: 'typeRole',
		});
	},
};
