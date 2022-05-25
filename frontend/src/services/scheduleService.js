import axios from '../axios';
import { LocalStorage } from '../utils';

const CreateScheduleService = async (data) => {
	return await axios.callVerify.post('/api/schedule/create', data, {
		headers: {
			authorization: `Bearer ${LocalStorage.get('accessToken')}`,
		},
	});
};

const GetScheduleByDateService = async (doctorId, date) => {
	return await axios.callAPI.get(`/api/schedule/by-date/${doctorId}/${date}`);
};

export { CreateScheduleService, GetScheduleByDateService };
