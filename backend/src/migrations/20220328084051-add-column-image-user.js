'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('Users', 'image', {
			type: Sequelize.STRING,
			after: 'lastName',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Users', 'image');
	},
};
