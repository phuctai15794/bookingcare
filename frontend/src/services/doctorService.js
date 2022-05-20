import axios from '../axios';

const ListDoctorsService = async () => {
	return await axios.callAPI.get('/api/doctor/list');
};

const ListDoctorsInWeekService = async () => {
	return await axios.callAPI.get('/api/doctor/list-in-week');
};

const UpdateInfoDoctorService = async (data) => {
	return await axios.callAPI.post('/api/doctor/update-info', data);
};

const GetDetailDoctorService = async (id) => {
	return await axios.callAPI.get(`/api/doctor/detail/${id}`);
};

export { ListDoctorsService, ListDoctorsInWeekService, UpdateInfoDoctorService, GetDetailDoctorService };
