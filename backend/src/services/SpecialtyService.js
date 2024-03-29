import _ from 'lodash';
import db from '../models/index';

let listAPI = () => {
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

let getDetailAPI = (id, locationId) => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.Specialty.findOne({
				where: {
					id,
				},
			});

			if (data) {
				const whereDoctorInfo = {
					specialtyId: id,
				};

				if (locationId && locationId !== 'ALL') {
					whereDoctorInfo.provinceId = locationId;
				}

				const doctorInfos = await db.DoctorInfo.findAll({
					attributes: ['doctorId', 'provinceId'],
					where: whereDoctorInfo,
				});

				data.doctorInfos = doctorInfos;
			}

			resole(data);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	listAPI,
	listHomeAPI,
	createSpecialtyAPI,
	getDetailAPI,
};
