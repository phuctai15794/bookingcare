import axios from '../axios';

const VerifyBookingPatientService = async (data) => {
	return await axios.callAPI.post('/api/verify/booking', data);
};

export { VerifyBookingPatientService };
