import _ from 'lodash';
import db from '../models/index';

let listHomeAPI = () => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.Specialty.findAll({
				order: [['createdAt', 'DESC']],
			});

			resole(data);
		} catch (error) {
			reject(error);
		}
	});
};

let createSpecialtyAPI = (data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};

			if (data) {
				await db.Specialty.create({
					image: data.image,
					contentHTML: data.contentHTML,
					contentMarkdown: data.contentMarkdown,
					name: data.name,
				});

				message.text = 'Create specialty successfully';
				message.type = 'success';
			} else {
				message.text = 'Update specialty successfully';
				message.type = 'info';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	listHomeAPI,
	createSpecialtyAPI,
};
