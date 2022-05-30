import jwtDecode from 'jwt-decode';
import axios from '../axios';
import { dispatch } from '../redux';
import actionTypes from '../store/actions/actionTypes';
import { LocalStorage } from '../utils';
import { RefreshTokenUserService } from './UserService';

const RefreshTokenService = () => {
	axios.callVerify.interceptors.request.use(
		async (config) => {
			let currentDate = new Date();
			const currentAccessToken = LocalStorage.get('accessToken');
			const decodedToken = jwtDecode(currentAccessToken);

			if (decodedToken.exp * 1000 < currentDate.getTime()) {
				const data = await RefreshTokenUserService();
				config.headers['authorization'] = `Bearer ${data.data.newAccessToken}`;
				await dispatch({
					type: actionTypes.REFRESH_TOKEN_USER,
					data: data.data,
				});
			}

			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	return null;
};

export default RefreshTokenService;
