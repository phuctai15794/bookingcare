import axios from '../axios';
import { LocalStorage } from '../utils';

const ListSpecialtiesHomeService = async () => {
	return await axios.callAPI.get('/api/specialty/list-home');
};

const CreateSpecialtyService = async (data) => {
	return await axios.callVerify.post('/api/specialty/create', data, {
		headers: {
			authorization: `Bearer ${LocalStorage.get('accessToken')}`,
		},
	});
};

export { ListSpecialtiesHomeService, CreateSpecialtyService };
