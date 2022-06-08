import ClinicService from '../services/ClinicService';

let listAPI = async (req, res) => {
	const clinics = await ClinicService.listAPI();

	return res.status(200).json({
		data: clinics,
	});
};

module.exports = {
	listAPI,
};
