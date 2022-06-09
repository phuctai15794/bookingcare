import actionTypes from './actionTypes';
import {
	ListSpecialtiesService,
	ListSpecialtiesHomeService,
	CreateSpecialtyService,
	GetDetailSpecialtyService,
} from '../../services/SpecialtyService';

export const fetchSpecialties = () => {
	return async (dispatch) => {
		dispatch(fetchSpecialtiesStart());
		await ListSpecialtiesService()
			.then((response) => {
				dispatch(fetchSpecialtiesSuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(fetchSpecialtiesFail(error));
			});
	};
};

export const fetchSpecialtiesStart = () => ({
	type: actionTypes.FETCH_SPECIALTY_START,
});

export const fetchSpecialtiesSuccess = (data) => ({
	type: actionTypes.FETCH_SPECIALTY_SUCCESS,
	data,
});

export const fetchSpecialtiesFail = (error) => ({
	type: actionTypes.FETCH_SPECIALTY_FAIL,
	error,
});

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

export const getDetailSpecialty = (id) => {
	return async (dispatch) => {
		dispatch(getDetailSpecialtyStart());
		await GetDetailSpecialtyService(id)
			.then((response) => {
				dispatch(getDetailSpecialtySuccess(response.data.data));
			})
			.catch((error) => {
				dispatch(getDetailSpecialtyFail(error));
			});
	};
};

export const getDetailSpecialtyStart = () => ({
	type: actionTypes.GET_DETAIL_SPECIALTY_START,
});

export const getDetailSpecialtySuccess = (data) => ({
	type: actionTypes.GET_DETAIL_SPECIALTY_SUCCESS,
	data,
});

export const getDetailSpecialtyFail = (error) => ({
	type: actionTypes.GET_DETAIL_SPECIALTY_FAIL,
	error,
});
