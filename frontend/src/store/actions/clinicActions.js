import actionTypes from './actionTypes';
import { ListClinicsService } from '../../services/ClinicService';

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
