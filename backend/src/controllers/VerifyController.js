import VerifyService from '../services/VerifyService';

let bookingPatientAPI = async (req, res) => {
	let data = req.query;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (!data.token || !data.doctorId) {
		result.message.type = 'error';
		result.message.text = 'Data is invalid';
	} else {
		result.message = await VerifyService.bookingPatientAPI(data);
	}

	return res.status(200).json({
		message: result.message,
	});
};

module.exports = {
	bookingPatientAPI,
};
