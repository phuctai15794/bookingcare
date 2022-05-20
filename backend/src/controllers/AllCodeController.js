import AllCodeService from '../services/AllCodeService';

let listAPI = async (req, res) => {
	const type = req.query.type;
	let result = {
		message: {
			type: '',
			text: '',
		},
		allCodes: {},
	};

	if (!type) {
		result.message.type = 'error';
		result.message.text = 'Data is invalid';
	} else {
		result.allCodes = await AllCodeService.listAPI(type);
	}

	return res.status(200).json({
		message: result.message,
		data: result.allCodes,
	});
};

module.exports = {
	listAPI,
};
