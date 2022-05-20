'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Users', 'password', {
			type: Sequelize.STRING,
			after: 'email',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Users', 'password');
	},
};
