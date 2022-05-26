'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DoctorInfo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// belongsTo
			DoctorInfo.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'infoData' });
			DoctorInfo.belongsTo(models.AllCode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' });
			DoctorInfo.belongsTo(models.AllCode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' });
			DoctorInfo.belongsTo(models.AllCode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData' });
		}
	}
	DoctorInfo.init(
		{
			doctorId: DataTypes.INTEGER,
			priceId: DataTypes.STRING,
			provinceId: DataTypes.STRING,
			provinceId: DataTypes.STRING,
			paymentId: DataTypes.STRING,
			addressClinic: DataTypes.STRING,
			nameClinic: DataTypes.STRING,
			note: DataTypes.TEXT,
			count: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'DoctorInfo',
		},
	);
	return DoctorInfo;
};
