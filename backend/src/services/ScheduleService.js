import _ from 'lodash';
import db from '../models/index';

let createScheduleAPI = (data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};
			const [doctor] = data;

			const doctorDetail = await db.User.findOne({
				where: {
					id: doctor.doctorId,
					roleId: 'R2',
				},
			});

			if (doctorDetail === null) {
				message.text = 'Doctor is invalid';
				message.type = 'error';
			} else {
				let schedulesDetail = null;
				const firstNewSchedule = !_.isEmpty(data) && data.at(0);

				if (firstNewSchedule) {
					schedulesDetail = await db.Schedule.findOne({
						where: {
							doctorId: firstNewSchedule.doctorId,
							date: firstNewSchedule.date,
						},
					});

					await db.Schedule.destroy({
						where: {
							doctorId: firstNewSchedule.doctorId,
							date: firstNewSchedule.date,
						},
					});
				}

				await db.Schedule.bulkCreate(data);

				if (!schedulesDetail) {
					message.text = 'Create schedule successfully';
					message.type = 'success';
				} else {
					message.text = 'Update schedule successfully';
					message.type = 'info';
				}
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

let getScheduleByDateAPI = (doctorId, date) => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.Schedule.findAll({
				raw: true,
				nest: true,
				include: [
					{
						model: db.AllCode,
						as: 'timeData',
						attributes: ['valueVi', 'valueEn'],
					},
				],
				where: {
					doctorId,
					date,
				},
			});

			resole(data);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	createScheduleAPI,
	getScheduleByDateAPI,
};
