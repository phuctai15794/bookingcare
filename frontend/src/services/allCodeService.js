import axios from '../axios';

const ListAllCodeService = async (type) => {
	return await axios.callAPI.get(`/api/allcode/list?type=${type}`);
};

export { ListAllCodeService };
