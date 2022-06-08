'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Specialty extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// hasMany
			Specialty.hasMany(models.DoctorInfo, { foreignKey: 'specialtyId', as: 'specialtyData' });
		}
	}
	Specialty.init(
		{
			name: DataTypes.STRING,
			contentHTML: DataTypes.TEXT('long'),
			contentMarkdown: DataTypes.TEXT('long'),
			image: DataTypes.BLOB,
		},
		{
			sequelize,
			modelName: 'Specialty',
		},
	);
	return Specialty;
};
