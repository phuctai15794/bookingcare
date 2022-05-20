'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('AllCodes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			key: {
				type: Sequelize.STRING,
			},
			type: {
				type: Sequelize.STRING,
			},
			valueVi: {
				type: Sequelize.STRING,
			},
			valueEn: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('AllCodes');
	},
};
