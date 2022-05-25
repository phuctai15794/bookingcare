import _ from 'lodash';
import ScheduleService from '../services/ScheduleService';

let createScheduleAPI = async (req, res) => {
	let data = req.body;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (_.isEmpty(data)) {
		result.message.type = 'error';
		result.message.text = 'Data is invalid';
	} else {
		result.message = await ScheduleService.createScheduleAPI(data);
	}

	return res.status(200).json({
		message: result.message,
	});
};

let getScheduleByDateAPI = async (req, res) => {
	const doctorId = req.params.doctorId;
	const date = req.params.date;
	let result = {
		message: {
			type: '',
			text: '',
		},
		data: {},
	};

	if (!doctorId || !date) {
		result.message.type = 'error';
		result.message.text = 'Data is invalid';
	} else {
		result.data = await ScheduleService.getScheduleByDateAPI(doctorId, date);
	}

	return res.status(200).json({
		data: result.data,
		message: result.message,
	});
};

module.exports = {
	createScheduleAPI,
	getScheduleByDateAPI,
};
