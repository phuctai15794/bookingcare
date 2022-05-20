'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.renameColumn('AllCodes', 'key', 'keyMap');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.renameColumn('AllCodes', 'keyMap', 'key');
	},
};
