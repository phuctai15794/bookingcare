import _ from 'lodash';
import DoctorService from '../services/DoctorService';

let listAPI = async (req, res) => {
	const limit = req.query.limit || 10;
	const doctor = await DoctorService.listAPI(+limit);

	return res.status(200).json({
		data: doctor,
	});
};

let listInWeekAPI = async (req, res) => {
	const doctor = await DoctorService.listInWeekAPI();

	return res.status(200).json({
		data: doctor,
	});
};

let listAppointmentAPI = async (req, res) => {
	const id = req.params.id;
	const date = req.query.date;
	let result = {
		message: {
			type: '',
			text: '',
		},
		appointments: {},
	};

	if (!id) {
		result.message.type = 'error';
		result.message.text = 'User is invalid';
	} else {
		result.appointments = await DoctorService.listAppointmentAPI(id, date);
	}

	return res.status(200).json({
		data: result.appointments,
		message: result.message,
	});
};

let sendRemedyAPI = async (req, res) => {
	let data = req.body;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (!data.doctorId || !data.patientId || !data.timeType || !data.email) {
		result.message.type = 'error';
		result.message.text = 'Data is invalid';
	} else {
		result.message = await DoctorService.sendRemedyAPI(data);
	}

	return res.status(200).json({
		message: result.message,
	});
};

let updateInfoAPI = async (req, res) => {
	let data = req.body;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (!data.doctorId) {
		result.message.type = 'error';
		result.message.text = 'Please choose a doctor';
	} else if (!data.selectPrices.selected) {
		result.message.type = 'error';
		result.message.text = 'Please choose a price';
	} else if (!data.selectPayments.selected) {
		result.message.type = 'error';
		result.message.text = 'Please choose a payment';
	} else if (!data.selectProvinces.selected) {
		result.message.type = 'error';
		result.message.text = 'Please choose a province';
	} else if (!data.selectSpecialties.selected) {
		result.message.type = 'error';
		result.message.text = 'Please choose a specialty';
		// } else if (!data.selectClinics.selected) {
		// 	result.message.type = 'error';
		// 	result.message.text = 'Please choose a clinic';
	} else if (!data.contentHTML || !data.contentMarkdown) {
		result.message.type = 'error';
		result.message.text = 'Please enter your content';
	} else {
		result.message = await DoctorService.updateInfoAPI(data);
	}

	return res.status(200).json({
		message: result.message,
	});
};

let getDetailAPI = async (req, res) => {
	const id = req.params.id;
	let result = {
		message: {
			type: '',
			text: '',
		},
		info: {},
	};

	if (!id) {
		result.message.type = 'error';
		result.message.text = 'User is invalid';
	} else {
		result.info = await DoctorService.getDetailAPI(id);
	}

	return res.status(200).json({
		data: result.info,
		message: result.message,
	});
};

let getProfileAPI = async (req, res) => {
	const id = req.params.id;
	let result = {
		message: {
			type: '',
			text: '',
		},
		info: {},
	};

	if (!id) {
		result.message.type = 'error';
		result.message.text = 'User is invalid';
	} else {
		result.info = await DoctorService.getProfileAPI(id);
	}

	return res.status(200).json({
		data: result.info,
		message: result.message,
	});
};

let getInfoAPI = async (req, res) => {
	const id = req.params.id;
	let result = {
		message: {
			type: '',
			text: '',
		},
		info: {},
	};

	if (!id) {
		result.message.type = 'error';
		result.message.text = 'User is invalid';
	} else {
		result.info = await DoctorService.getInfoAPI(id);
	}

	return res.status(200).json({
		data: result.info,
		message: result.message,
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
