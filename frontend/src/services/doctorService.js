import axios from '../axios';
import { LocalStorage } from '../utils';

const ListDoctorsInWeekService = async () => {
	return await axios.callAPI.get('/api/doctor/list-in-week');
};

const ListDoctorsService = async () => {
	return await axios.callAPI.get('/api/doctor/list');
};

const ListAppointmentsService = async (id, date) => {
	let query = Number(date) ? `?date=${date}` : '';
	return await axios.callAPI.get(`/api/doctor/appointment/list/${id}${query}`);
};

const UpdateInfoDoctorService = async (data) => {
	return await axios.callVerify.post('/api/doctor/update-info', data, {
		headers: {
			authorization: `Bearer ${LocalStorage.get('accessToken')}`,
		},
	});
};

const GetDetailDoctorService = async (id) => {
	return await axios.callAPI.get(`/api/doctor/detail/${id}`);
};

const GetProfileDoctorService = async (id) => {
	return await axios.callAPI.get(`/api/doctor/profile/${id}`);
};

const GetInfoDoctorService = async (id) => {
	return await axios.callAPI.get(`/api/doctor/info/${id}`);
};

export {
	ListDoctorsService,
	ListDoctorsInWeekService,
	ListAppointmentsService,
	UpdateInfoDoctorService,
	GetDetailDoctorService,
	GetProfileDoctorService,
	GetInfoDoctorService,
};
