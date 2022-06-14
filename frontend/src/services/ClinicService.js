import axios from '../axios';
import { LocalStorage } from '../utils';

const ListClinicsService = async () => {
	return await axios.callAPI.get('/api/clinic/list');
};

const CreateClinicService = async (data) => {
	return await axios.callVerify.post('/api/clinic/create', data, {
		headers: {
			authorization: `Bearer ${LocalStorage.get('accessToken')}`,
		},
	});
};

export { ListClinicsService, CreateClinicService };
