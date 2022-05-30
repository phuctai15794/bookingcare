import actionTypes from './actionTypes';
import { ListAllCodeService } from '../../services/AllCodeService';

export const fetchAllCode = (type) => {
	type = type.toUpperCase();

	return async (dispatch) => {
		dispatch(fetchAllCodeStart(type));
		await ListAllCodeService(type)
			.then((response) => {
				dispatch(fetchAllCodeSuccess(type, response.data.data));
			})
			.catch((error) => {
				dispatch(fetchAllCodeFail(type, error));
			});
	};
};

export const fetchAllCodeStart = (type) => ({
	type: actionTypes[`FETCH_${type}_START`],
	typeData: type,
});

export const fetchAllCodeSuccess = (type, data) => ({
	type: actionTypes[`FETCH_${type}_SUCCESS`],
	typeData: type,
	data,
});

export const fetchAllCodeFail = (type, error) => ({
	type: actionTypes[`FETCH_${type}_FAIL`],
	typeData: type,
	error,
});
