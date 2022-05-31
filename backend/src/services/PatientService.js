import _ from 'lodash';
import db from '../models/index';
import EmailService from './EmailService';
import { Functions, Constants } from '../utils';

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
				},
			});

			if (user) {
				const [booking, created] = await db.Booking.findOrCreate({
					where: { patientId: user.id },
					defaults: {
						statusId: 'S1',
						doctorId: data.doctorId,
						patientId: user.id,
						date: data.date,
						timeType: data.timeType,
					},
				});

				if (created) {
					await EmailService.sendAPI({
						to: user.email,
						subject: 'Booking Information',
						templateName: 'booking/patient',
						templateVars: {
							firstName: user.firstName,
							lastName: user.lastName,
							date: Functions.formatDate(data.date, Constants.DATE_FORMAT.STANDARD, 'unixValue'),
							timeBooking: '(8:00 - 9:00, Hôm nay - 31/05/2022)',
							doctorName: 'Bác sĩ, Lavinia Crist',
							redirectLink: 'https://google.com',
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
