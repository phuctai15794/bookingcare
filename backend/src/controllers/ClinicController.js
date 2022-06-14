import ClinicService from '../services/ClinicService';

let listAPI = async (req, res) => {
	const clinics = await ClinicService.listAPI();

	return res.status(200).json({
		data: clinics,
	});
};

let createClinicAPI = async (req, res) => {
	let data = req.body;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (!data.name) {
		result.message.type = 'error';
		result.message.text = "Please enter a clinic's name";
	} else if (!data.address) {
		result.message.type = 'error';
		result.message.text = "Please enter a clinic's address";
	} else if (!data.contentHTML || !data.contentMarkdown) {
		result.message.type = 'error';
		result.message.text = "Please enter clinic's content";
	} else {
		result.message = await ClinicService.createClinicAPI(data);
	}

	return res.status(200).json({
		message: result.message,
	});
};

module.exports = {
	listAPI,
	createClinicAPI,
};
