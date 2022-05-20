import axios from '../axios';
import { LocalStorage } from '../utils';

const LoginUserService = async (email, password) => {
	return await axios.callAPI.post('/api/login', { email, password });
};

const LogoutUserService = async () => {
	return await axios.callVerify.post(
		'/api/logout',
		{ token: LocalStorage.get('refreshToken') },
		{
			headers: {
				authorization: `Bearer ${LocalStorage.get('accessToken')}`,
			},
		},
	);
};

const RefreshTokenUserService = async () => {
	return await axios.callAPI.post('/api/refresh', { token: LocalStorage.get('refreshToken') });
};

const ListUsersService = async () => {
	return await axios.callAPI.get('/api/user/list');
};

const CreateUserService = async (data) => {
	return await axios.callAPI.post('/api/user/create', data);
};

const UpdateUserService = async (data) => {
	return await axios.callVerify.put(`/api/user/update/${data.id}`, data, {
		headers: {
			authorization: `Bearer ${LocalStorage.get('accessToken')}`,
		},
	});
};

const DeleteUserService = async (id) => {
	return await axios.callAPI.delete(`/api/user/delete/${id}`);
};

export {
	LoginUserService,
	LogoutUserService,
	RefreshTokenUserService,
	ListUsersService,
	CreateUserService,
	UpdateUserService,
	DeleteUserService,
};
