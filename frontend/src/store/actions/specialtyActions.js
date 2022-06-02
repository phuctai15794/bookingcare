import actionTypes from './actionTypes';
import { CreateSpecialtyService } from '../../services/SpecialtyService';

export const createSpecialty = (data) => {
	return async (dispatch) => {
		dispatch(createSpecialtyStart());
		await CreateSpecialtyService(data)
			.then((response) => {
				dispatch(createSpecialtySuccess(response.data.message));
			})
			.catch((error) => {
				dispatch(createSpecialtyFail(error));
			});
	};
};

export const createSpecialtyStart = () => ({
	type: actionTypes.CREATE_SPECIALTY_START,
});

export const createSpecialtySuccess = (message) => ({
	type: actionTypes.CREATE_SPECIALTY_SUCCESS,
	message,
});

export const createSpecialtyFail = (error) => ({
	type: actionTypes.CREATE_SPECIALTY_FAIL,
	error,
});
