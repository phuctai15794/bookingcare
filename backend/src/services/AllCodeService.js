import db from '../models/index';

let listAPI = (type) => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.AllCode.findAll({
				where: { type },
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
