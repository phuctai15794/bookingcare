import axios from 'axios';

const callAPI = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
});

const callVerify = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
});

const axiosInstances = { callAPI, callVerify };

export default axiosInstances;
