'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class AllCode extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// hasMany
			AllCode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' });
			AllCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
			AllCode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeData' });
			AllCode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeBookingData' });
			AllCode.hasMany(models.Booking, { foreignKey: 'statusId', as: 'statusData' });
			AllCode.hasMany(models.DoctorInfo, { foreignKey: 'priceId', as: 'priceData' });
			AllCode.hasMany(models.DoctorInfo, { foreignKey: 'paymentId', as: 'paymentData' });
			AllCode.hasMany(models.DoctorInfo, { foreignKey: 'provinceId', as: 'provinceData' });
		}
	}
	AllCode.init(
		{
			keyMap: DataTypes.STRING,
			type: DataTypes.STRING,
			valueVi: DataTypes.STRING,
			valueEn: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'AllCode',
		},
	);
	return AllCode;
};
