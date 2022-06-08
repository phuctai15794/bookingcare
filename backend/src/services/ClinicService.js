import _ from 'lodash';
import db from '../models/index';

let listAPI = () => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.Clinic.findAll({
				order: [['createdAt', 'DESC']],
			});

			resole(data);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	listAPI,
};
