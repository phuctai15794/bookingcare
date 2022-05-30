import actionTypes from './actionTypes';
import {
	ListDoctorsService,
	ListDoctorsInWeekService,
	UpdateInfoDoctorService,
	GetDetailDoctorService,
	GetProfileDoctorService,
	GetInfoDoctorService,
} from '../../services/DoctorService';

export const fetchDoctors = () => {
	return async (dispatch) => {
		dispatch(fetchDoctorsStart());
		await ListDoctorsService()
			.then((response) => {
				dispatch(fetchDoctorsSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(fetchDoctorsFail(error));
			});
	};
};

export const fetchDoctorsStart = () => ({
	type: actionTypes.FETCH_DOCTOR_START,
});

export const fetchDoctorsSuccess = (data) => ({
	type: actionTypes.FETCH_DOCTOR_SUCCESS,
	data,
});

export const fetchDoctorsFail = (error) => ({
	type: actionTypes.FETCH_DOCTOR_FAIL,
	error,
});

export const fetchDoctorsInWeek = () => {
	return async (dispatch) => {
		dispatch(fetchDoctorsInWeekStart());
		await ListDoctorsInWeekService()
			.then((response) => {
				dispatch(fetchDoctorsInWeekSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(fetchDoctorsInWeekFail(error));
			});
	};
};

export const fetchDoctorsInWeekStart = () => ({
	type: actionTypes.FETCH_DOCTOR_IN_WEEK_START,
});

export const fetchDoctorsInWeekSuccess = (data) => ({
	type: actionTypes.FETCH_DOCTOR_IN_WEEK_SUCCESS,
	data,
});

export const fetchDoctorsInWeekFail = (error) => ({
	type: actionTypes.FETCH_DOCTOR_IN_WEEK_FAIL,
	error,
});

export const updateInfoDoctor = (data) => {
	return async (dispatch) => {
		dispatch(updateInfoDoctorStart());
		await UpdateInfoDoctorService(data)
			.then((response) => {
				dispatch(updateInfoDoctorSuccess(response.data.message));
			})
			.catch((error) => {
				dispatch(updateInfoDoctorFail(error));
			});
	};
};

export const updateInfoDoctorStart = () => ({
	type: actionTypes.UPDATE_INFO_DOCTOR_START,
});

export const updateInfoDoctorSuccess = (message) => ({
	type: actionTypes.UPDATE_INFO_DOCTOR_SUCCESS,
	message,
});

export const updateInfoDoctorFail = (error) => ({
	type: actionTypes.UPDATE_INFO_DOCTOR_FAIL,
	error,
});

export const getDetailDoctor = (id) => {
	return async (dispatch) => {
		dispatch(getDetailDoctorStart());
		await GetDetailDoctorService(id)
			.then((response) => {
				dispatch(getDetailDoctorSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(getDetailDoctorFail(error));
			});
	};
};

export const getDetailDoctorStart = () => ({
	type: actionTypes.GET_DETAIL_DOCTOR_START,
});

export const getDetailDoctorSuccess = (data) => ({
	type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
	data,
});

export const getDetailDoctorFail = (error) => ({
	type: actionTypes.GET_DETAIL_DOCTOR_FAIL,
	error,
});

export const getProfileDoctor = (id) => {
	return async (dispatch) => {
		dispatch(getProfileDoctorStart());
		await GetProfileDoctorService(id)
			.then((response) => {
				dispatch(getProfileDoctorSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(getProfileDoctorFail(error));
			});
	};
};

export const getProfileDoctorStart = () => ({
	type: actionTypes.GET_PROFILE_DOCTOR_START,
});

export const getProfileDoctorSuccess = (data) => ({
	type: actionTypes.GET_PROFILE_DOCTOR_SUCCESS,
	data,
});

export const getProfileDoctorFail = (error) => ({
	type: actionTypes.GET_PROFILE_DOCTOR_FAIL,
	error,
});

export const getInfoDoctor = (id) => {
	return async (dispatch) => {
		dispatch(getInfoDoctorStart());
		await GetInfoDoctorService(id)
			.then((response) => {
				dispatch(getInfoDoctorSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(getInfoDoctorFail(error));
			});
	};
};

export const getInfoDoctorStart = () => ({
	type: actionTypes.GET_INFO_DOCTOR_START,
});

export const getInfoDoctorSuccess = (data) => ({
	type: actionTypes.GET_INFO_DOCTOR_SUCCESS,
	data,
});

export const getInfoDoctorFail = (error) => ({
	type: actionTypes.GET_INFO_DOCTOR_FAIL,
	error,
});
