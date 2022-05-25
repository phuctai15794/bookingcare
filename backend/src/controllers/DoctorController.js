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

module.exports = {
	listAPI,
	listInWeekAPI,
	updateInfoAPI,
	getDetailAPI,
};
