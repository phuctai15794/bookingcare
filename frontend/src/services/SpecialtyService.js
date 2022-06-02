import axios from '../axios';
import { LocalStorage } from '../utils';

const CreateSpecialtyService = async (data) => {
	return await axios.callVerify.post('/api/specialty/create', data, {
		headers: {
			authorization: `Bearer ${LocalStorage.get('accessToken')}`,
		},
	});
};

export { CreateSpecialtyService };
