import SpecialtyService from '../services/SpecialtyService';

let createSpecialtyAPI = async (req, res) => {
	let data = req.body;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (!data.name) {
		result.message.type = 'error';
		result.message.text = "Please enter a specialty's name";
	} else if (!data.contentHTML || !data.contentMarkdown) {
		result.message.type = 'error';
		result.message.text = "Please enter specialty's content";
	} else {
		result.message = await SpecialtyService.createSpecialtyAPI(data);
	}

	return res.status(200).json({
		message: result.message,
	});
};

module.exports = {
	createSpecialtyAPI,
};
