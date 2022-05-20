import actionTypes from './actionTypes';
import {
	ListDoctorsService,
	ListDoctorsInWeekService,
	UpdateInfoDoctorService,
	GetDetailDoctorService,
} from '../../services/doctorService';

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
