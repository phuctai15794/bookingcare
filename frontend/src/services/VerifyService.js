import axios from '../axios';

const VerifyBookingPatientService = async (data) => {
	return await axios.callAPI.get(`/api/verify/booking?token=${data.token}&doctorId=${data.doctorId}`);
};

export { VerifyBookingPatientService };
