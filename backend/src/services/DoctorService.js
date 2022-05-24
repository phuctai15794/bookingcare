import _ from 'lodash';
import db from '../models/index';
import { Constants, Functions } from '../utils';

let listAPI = (limit) => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.User.findAll({
				raw: true,
				nest: true,
				attributes: {
					exclude: ['password'],
				},
				include: [
					{
						model: db.AllCode,
						as: 'positionData',
						attributes: ['valueVi', 'valueEn'],
					},
					{
						model: db.AllCode,
						as: 'genderData',
						attributes: ['valueVi', 'valueEn'],
					},
				],
				where: {
					roleId: 'R2',
				},
				order: [['createdAt', 'DESC']],
				offset: 0,
				limit,
			});

			resole(data);
		} catch (error) {
			reject(error);
		}
	});
};

let listInWeekAPI = () => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.User.findAll({
				raw: true,
				nest: true,
				attributes: {
					exclude: ['password'],
				},
				include: [
					{
						model: db.AllCode,
						as: 'positionData',
						attributes: ['valueVi', 'valueEn'],
					},
					{
						model: db.AllCode,
						as: 'genderData',
						attributes: ['valueVi', 'valueEn'],
					},
				],
				where: {
					roleId: 'R2',
				},
				order: [['createdAt', 'DESC']],
			});

			resole(data);
		} catch (error) {
			reject(error);
		}
	});
};

let updateInfoAPI = (data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};
			const doctorDetail = await db.User.findOne({
				where: {
					id: data.doctorId,
					roleId: 'R2',
				},
			});

			if (doctorDetail === null) {
				message.text = 'Doctor is invalid';
				message.type = 'error';
			} else {
				const doctorMarkdownDetail = await db.Markdown.findOne({
					where: {
						doctorId: data.doctorId,
					},
				});

				if (doctorMarkdownDetail === null) {
					await db.Markdown.create({
						doctorId: data.doctorId,
						contentHTML: data.contentHTML,
						contentMarkdown: data.contentMarkdown,
						description: data.description,
					});
				} else {
					await db.Markdown.update(
						{
							doctorId: data.doctorId,
							contentHTML: data.contentHTML,
							contentMarkdown: data.contentMarkdown,
							description: data.description,
							updatedAt: new Date(),
						},
						{
							where: { id: doctorMarkdownDetail.id },
						},
					);
				}

				message.text = 'Update info successfully';
				message.type = 'success';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

let getDetailAPI = (id) => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.User.findOne({
				raw: true,
				nest: true,
				attributes: {
					exclude: ['password'],
				},
				include: [
					{
						model: db.Markdown,
						as: 'markdownData',
						attributes: ['contentHTML', 'contentMarkdown', 'description'],
					},
					{
						model: db.AllCode,
						as: 'positionData',
						attributes: ['valueVi', 'valueEn'],
					},
					{
						model: db.AllCode,
						as: 'genderData',
						attributes: ['valueVi', 'valueEn'],
					},
				],
				where: {
					id,
					roleId: 'R2',
				},
			});

			resole(data);
		} catch (error) {
			reject(error);
		}
	});
};

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
								schedulesList.every((scheduleListItem) => {
									let dateList = Functions.formatDate(
										scheduleListItem.date,
										Constants.DATE_FORMAT.STANDARD,
									);
									let dateNew = Functions.formatDate(
										scheduleNewItem.date,
										Constants.DATE_FORMAT.STANDARD,
									);

									return (
										dateList !== dateNew || scheduleListItem.timeType !== scheduleNewItem.timeType
									);
								}) && scheduleNewItem,
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
	listAPI,
	listInWeekAPI,
	updateInfoAPI,
	getDetailAPI,
	createScheduleAPI,
	getScheduleByDateAPI,
};
