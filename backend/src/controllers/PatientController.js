import PatientService from '../services/PatientService';

let bookingPatientAPI = async (req, res) => {
	let data = req.body;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (!data.email || !data.doctorId || !data.date || !data.timeType) {
		result.message.type = 'error';
		result.message.text = 'Data is invalid';
	} else {
		result.message = await PatientService.bookingPatientAPI(data);
	}

	return res.status(200).json({
		message: result.message,
	});
};

module.exports = {
	bookingPatientAPI,
};
