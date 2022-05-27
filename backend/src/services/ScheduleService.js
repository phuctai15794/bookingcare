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
				const schedulesList = await db.Schedule.findAll({
					where: {
						doctorId: doctorDetail.id,
					},
				});
				const schedulesNew =
					(!_.isEmpty(schedulesList) &&
						data.filter(
							(scheduleNewItem) =>
								schedulesList.every(
									(scheduleListItem) =>
										scheduleListItem.date !== scheduleNewItem.date ||
										scheduleListItem.timeType !== scheduleNewItem.timeType,
								) && scheduleNewItem,
						)) ||
					(_.isEmpty(schedulesList) && data);

				if (!_.isEmpty(schedulesNew)) {
					await db.Schedule.bulkCreate(schedulesNew);
					message.text = 'Create schedule successfully';
					message.type = 'success';
				} else {
					message.text = 'Schedules already exists';
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

let getScheduleByDoctorAPI = (doctorid) => {
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
					doctorid,
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
	getScheduleByDoctorAPI,
};
