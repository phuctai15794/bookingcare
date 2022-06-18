import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import db from '../models/index';
import EmailService from './EmailService';

let buildToken = () => {
	return uuidv4();
};

let buildUrl = (token, doctorId) => {
	let result = `${process.env.URL_FRONTEND}/verify/booking?token=${token}&doctorId=${doctorId}`;
	return result;
};

let bookingPatientAPI = (data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};

			const [user] = await db.User.findOrCreate({
				where: { email: data.email },
				defaults: {
					roleId: 'R3',
					email: data.email,
					firstName: data.firstName,
					lastName: data.lastName,
					phone: data.phone,
					address: data.address,
					gender: data.gender,
					medicalReason: data.medicalReason,
				},
			});

			if (user) {
				const token = buildToken();
				const [booking, created] = await db.Booking.findOrCreate({
					where: {
						statusId: {
							[Op.in]: ['S1', 'S2'],
						},
						patientId: user.id,
						date: data.date,
					},
					defaults: {
						statusId: 'S1',
						doctorId: data.doctorId,
						patientId: user.id,
						date: data.date,
						timeType: data.timeType,
						token,
					},
				});

				if (created) {
					await EmailService.sendAPI({
						to: user.email,
						subject: 'Thông tin đặt lịch khám bệnh',
						templateName: `booking/patient/${data.language}`,
						templateVars: {
							firstName: user.firstName,
							lastName: user.lastName,
							timeString: data.timeString,
							doctorName: data.doctorName,
							priceMedical: data.priceMedical,
							medicalReason: data.medicalReason,
							redirectLink: buildUrl(token, data.doctorId),
						},
					});

					message.text = 'Booking successfully';
					message.type = 'success';
				} else {
					message.text = 'Booking info already exists';
					message.type = 'info';
				}
			} else {
				message.text = 'Booking failure';
				message.type = 'error';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	bookingPatientAPI,
};
