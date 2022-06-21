import _ from 'lodash';
import db from '../models/index';

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

let listAppointmentAPI = (id, date) => {
	return new Promise(async (resole, reject) => {
		try {
			const whereBooking = {
				statusId: 'S2',
				doctorId: id,
			};

			if (Number(date)) {
				whereBooking.date = date;
			}

			const data = await db.Booking.findAll({
				raw: true,
				nest: true,
				include: [
					{
						model: db.User,
						as: 'patientData',
						attributes: ['firstName', 'lastName', 'email', 'medicalReason', 'address', 'phone', 'gender'],
						include: [
							{
								model: db.AllCode,
								as: 'genderData',
								attributes: ['valueVi', 'valueEn'],
							},
						],
					},
					{
						model: db.AllCode,
						as: 'statusData',
						attributes: ['valueVi', 'valueEn'],
					},
					{
						model: db.AllCode,
						as: 'timeBookingData',
						attributes: ['valueVi', 'valueEn'],
					},
				],
				where: whereBooking,
				order: [['createdAt', 'DESC']],
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

let sendRemedyAPI = (data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};

			// Get detail appointment
			const appointmentDetail = await db.Booking.findOne({
				where: {
					statusId: 'S2',
					doctorId: data.doctorId,
					patientId: data.patientId,
					timeType: data.timeType,
				},
			});

			// Update appointment
			if (appointmentDetail) {
				await db.Booking.update(
					{
						statusId: 'S3',
						updatedAt: new Date(),
					},
					{
						where: { id: appointmentDetail.id },
					},
				);

				message.text = 'Send remedy successfully';
				message.type = 'success';
			} else {
				message.text = 'Data is invalid';
				message.type = 'error';
			}

			resole(message);
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
				// Markdown
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

				// Info
				const doctorInfoDetail = await db.DoctorInfo.findOne({
					where: {
						doctorId: data.doctorId,
					},
				});

				if (doctorInfoDetail === null) {
					await db.DoctorInfo.create({
						doctorId: data.doctorId,
						priceId: data.selectPrices.selected.value,
						provinceId: data.selectProvinces.selected.value,
						paymentId: data.selectPayments.selected.value,
						specialtyId: data.selectSpecialties.selected.value,
						nameClinic: data.nameClinic,
						addressClinic: data.addressClinic,
						note: data.note,
					});
				} else {
					await db.DoctorInfo.update(
						{
							doctorId: data.doctorId,
							priceId: data.selectPrices.selected.value,
							provinceId: data.selectProvinces.selected.value,
							paymentId: data.selectPayments.selected.value,
							specialtyId: data.selectSpecialties.selected.value,
							nameClinic: data.nameClinic,
							addressClinic: data.addressClinic,
							note: data.note,
							updatedAt: new Date(),
						},
						{
							where: { id: doctorInfoDetail.id },
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
						model: db.DoctorInfo,
						as: 'infoData',
						include: [
							{
								model: db.Specialty,
								as: 'specialtyData',
								attributes: ['id', 'name'],
							},
							{
								model: db.Clinic,
								as: 'clinicData',
								attributes: ['id', 'name'],
							},
							{
								model: db.AllCode,
								as: 'priceData',
								attributes: ['keyMap', 'valueVi', 'valueEn'],
							},
							{
								model: db.AllCode,
								as: 'paymentData',
								attributes: ['keyMap', 'valueVi', 'valueEn'],
							},
							{
								model: db.AllCode,
								as: 'provinceData',
								attributes: ['keyMap', 'valueVi', 'valueEn'],
							},
						],
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

let getProfileAPI = (id) => {
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
						attributes: ['description'],
					},
					{
						model: db.AllCode,
						as: 'positionData',
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

let getInfoAPI = (id) => {
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
						model: db.DoctorInfo,
						as: 'infoData',
						include: [
							{
								model: db.AllCode,
								as: 'priceData',
								attributes: ['valueVi', 'valueEn'],
							},
							{
								model: db.AllCode,
								as: 'paymentData',
								attributes: ['valueVi', 'valueEn'],
							},
							{
								model: db.AllCode,
								as: 'provinceData',
								attributes: ['valueVi', 'valueEn'],
							},
						],
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

module.exports = {
	listAPI,
	listInWeekAPI,
	listAppointmentAPI,
	sendRemedyAPI,
	updateInfoAPI,
	getDetailAPI,
	getProfileAPI,
	getInfoAPI,
};
