import _ from 'lodash';
import db from '../models/index';

let bookingPatientAPI = (data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};

			const bookingDetail = await db.Booking.findOne({
				where: {
					doctorId: data.doctorId,
					token: data.token,
					statusId: 'S1',
				},
			});

			if (bookingDetail) {
				await db.Booking.update(
					{
						statusId: 'S2',
					},
					{
						where: { id: bookingDetail.id },
					},
				);

				message.text = 'Booking information is updated successfully';
				message.type = 'success';
			} else {
				message.text = 'Booking information has been activated or does not exist';
				message.type = 'info';
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
