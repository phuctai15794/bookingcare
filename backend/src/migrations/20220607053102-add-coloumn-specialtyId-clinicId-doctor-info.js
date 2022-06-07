'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('DoctorInfos', 'specialtyId', {
			type: Sequelize.STRING,
			after: 'priceId',
		});
		await queryInterface.addColumn('DoctorInfos', 'clinicId', {
			type: Sequelize.STRING,
			after: 'specialtyId',
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('DoctorInfos', 'specialtyId');
		await queryInterface.removeColumn('DoctorInfos', 'clinicId');
	},
};
