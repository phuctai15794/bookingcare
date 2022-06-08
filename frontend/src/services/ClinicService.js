import axios from '../axios';

const ListClinicsService = async () => {
	return await axios.callAPI.get('/api/clinic/list');
};

export { ListClinicsService };
