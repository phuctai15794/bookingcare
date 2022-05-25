import axios from '../axios';
import { LocalStorage } from '../utils';

const CreateScheduleService = async (data) => {
	return await axios.callVerify.post('/api/schedule/create', data, {
		headers: {
			authorization: `Bearer ${LocalStorage.get('accessToken')}`,
		},
	});
};

export { CreateScheduleService };
