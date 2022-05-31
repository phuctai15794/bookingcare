'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// belongsTo
			User.belongsTo(models.AllCode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' });
			User.belongsTo(models.AllCode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' });

			// hasOne
			User.hasOne(models.Markdown, { foreignKey: 'doctorId', as: 'markdownData' });
			User.hasOne(models.DoctorInfo, { foreignKey: 'doctorId', as: 'infoData' });

			// hasMany
			User.hasMany(models.Schedule, { foreignKey: 'doctorId', as: 'userData' });
		}
	}
	User.init(
		{
			roleId: DataTypes.STRING,
			positionId: DataTypes.STRING,
			firstName: DataTypes.STRING,
			lastName: DataTypes.STRING,
			image: DataTypes.BLOB,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			address: DataTypes.STRING,
			gender: DataTypes.STRING,
			phone: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		},
	);
	return User;
};
