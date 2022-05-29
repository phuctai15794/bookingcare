import axios from '../axios';

const BookingPatientService = async (data) => {
	return await axios.callAPI.post('/api/patient/booking', data);
};

export { BookingPatientService };
