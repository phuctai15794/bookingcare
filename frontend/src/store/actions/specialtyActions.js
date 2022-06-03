import actionTypes from './actionTypes';
import { ListSpecialtiesHomeService, CreateSpecialtyService } from '../../services/SpecialtyService';

export const fetchSpecialtiesHome = () => {
	return async (dispatch) => {
		dispatch(fetchSpecialtiesHomeStart());
		await ListSpecialtiesHomeService()
			.then((response) => {
				dispatch(fetchSpecialtiesHomeSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(fetchSpecialtiesHomeFail(error));
			});
	};
};

export const fetchSpecialtiesHomeStart = () => ({
	type: actionTypes.FETCH_SPECIALTY_HOME_START,
});

export const fetchSpecialtiesHomeSuccess = (data) => ({
	type: actionTypes.FETCH_SPECIALTY_HOME_SUCCESS,
	data,
});

export const fetchSpecialtiesHomeFail = (error) => ({
	type: actionTypes.FETCH_SPECIALTY_HOME_FAIL,
	error,
});

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
