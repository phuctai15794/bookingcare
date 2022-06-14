import actionTypes from './actionTypes';
import { ListClinicsService, CreateClinicService } from '../../services/ClinicService';

export const fetchClinics = () => {
	return async (dispatch) => {
		dispatch(fetchClinicsStart());
		await ListClinicsService()
			.then((response) => {
				dispatch(fetchClinicsSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(fetchClinicsFail(error));
			});
	};
};

export const fetchClinicsStart = () => ({
	type: actionTypes.FETCH_CLINIC_START,
});

export const fetchClinicsSuccess = (data) => ({
	type: actionTypes.FETCH_CLINIC_SUCCESS,
	data,
});

export const fetchClinicsFail = (error) => ({
	type: actionTypes.FETCH_CLINIC_FAIL,
	error,
});

export const createClinic = (data) => {
	return async (dispatch) => {
		dispatch(createClinicStart());
		await CreateClinicService(data)
			.then((response) => {
				dispatch(createClinicSuccess(response.data.message));
			})
			.catch((error) => {
				dispatch(createClinicFail(error));
			});
	};
};

export const createClinicStart = () => ({
	type: actionTypes.CREATE_CLINIC_START,
});

export const createClinicSuccess = (message) => ({
	type: actionTypes.CREATE_CLINIC_SUCCESS,
	message,
});

export const createClinicFail = (error) => ({
	type: actionTypes.CREATE_CLINIC_FAIL,
	error,
});
