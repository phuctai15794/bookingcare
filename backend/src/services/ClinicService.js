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

let createClinicAPI = (data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};

			if (data) {
				await db.Clinic.create({
					image: data.image,
					contentHTML: data.contentHTML,
					contentMarkdown: data.contentMarkdown,
					name: data.name,
					address: data.address,
				});

				message.text = 'Create clinic successfully';
				message.type = 'success';
			} else {
				message.text = 'Update clinic successfully';
				message.type = 'info';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	listAPI,
	createClinicAPI,
};
