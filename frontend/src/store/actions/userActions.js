import actionTypes from './actionTypes';
import {
	LoginUserService,
	LogoutUserService,
	ListUsersService,
	CreateUserService,
	UpdateUserService,
	DeleteUserService,
} from '../../services/UserService';

export const loginUser = (email, password) => {
	return async (dispatch) => {
		dispatch(loginUserStart());
		await LoginUserService(email, password)
			.then((response) => {
				dispatch(loginUserSuccess(response.data));
			})
			.catch((error) => {
				dispatch(loginUserFail(error));
			});
	};
};

export const loginUserStart = () => ({
	type: actionTypes.LOGIN_USER_START,
});

export const loginUserSuccess = (data) => ({
	type: actionTypes.LOGIN_USER_SUCCESS,
	data,
});

export const loginUserFail = (error) => ({
	type: actionTypes.LOGIN_USER_FAIL,
	error,
});

export const logoutUser = () => {
	return async (dispatch) => {
		dispatch(logoutUserStart());
		await LogoutUserService()
			.then((response) => {
				dispatch(logoutUserDone());
			})
			.catch((error) => {
				dispatch(logoutUserDone());
			});
	};
};

export const logoutUserStart = () => ({
	type: actionTypes.LOGOUT_USER_START,
});

export const logoutUserDone = () => ({
	type: actionTypes.LOGOUT_USER_DONE,
});

export const resetActionUser = (action) => ({
	type: actionTypes.RESET_ACTION_USER,
	action,
});

export const fetchUsers = () => {
	return async (dispatch) => {
		dispatch(fetchUsersStart());
		await ListUsersService()
			.then((response) => {
				dispatch(fetchUsersSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(fetchUsersFail(error));
			});
	};
};

export const fetchUsersStart = () => ({
	type: actionTypes.FETCH_USER_START,
});

export const fetchUsersSuccess = (data) => ({
	type: actionTypes.FETCH_USER_SUCCESS,
	data,
});

export const fetchUsersFail = (error) => ({
	type: actionTypes.FETCH_USER_FAIL,
	error,
});

export const createUser = (data) => {
	return async (dispatch) => {
		dispatch(createUserStart());
		await CreateUserService(data)
			.then((response) => {
				dispatch(createUserSuccess(response.data.message));
			})
			.catch((error) => {
				dispatch(createUserFail(error));
			});
	};
};

export const createUserStart = () => ({
	type: actionTypes.CREATE_USER_START,
});

export const createUserSuccess = (message) => ({
	type: actionTypes.CREATE_USER_SUCCESS,
	message,
});

export const createUserFail = (error) => ({
	type: actionTypes.CREATE_USER_FAIL,
	error,
});

export const updateUser = (data) => {
	return async (dispatch) => {
		dispatch(updateUserStart());
		await UpdateUserService(data)
			.then((response) => {
				dispatch(updateUserSuccess(response.data.message));
			})
			.catch((error) => {
				dispatch(updateUserFail(error));
			});
	};
};

export const updateUserStart = () => ({
	type: actionTypes.UPDATE_USER_START,
});

export const updateUserSuccess = (message) => ({
	type: actionTypes.UPDATE_USER_SUCCESS,
	message,
});

export const updateUserFail = (error) => ({
	type: actionTypes.UPDATE_USER_FAIL,
	error,
});

export const deleteUser = (data) => {
	return async (dispatch) => {
		dispatch(deleteUserStart());
		await DeleteUserService(data)
			.then((response) => {
				dispatch(deleteUserSuccess(response.data.message));
			})
			.catch((error) => {
				dispatch(deleteUserFail(error));
			});
	};
};

export const deleteUserStart = () => ({
	type: actionTypes.DELETE_USER_START,
});

export const deleteUserSuccess = (message) => ({
	type: actionTypes.DELETE_USER_SUCCESS,
	message,
});

export const deleteUserFail = (error) => ({
	type: actionTypes.DELETE_USER_FAIL,
	error,
});
