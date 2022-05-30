import actionTypes from './actionTypes';
import { CreateScheduleService, GetScheduleByDateService } from '../../services/ScheduleService';

export const createSchedule = (data) => {
	return async (dispatch) => {
		dispatch(createScheduleStart());
		await CreateScheduleService(data)
			.then((response) => {
				dispatch(createScheduleSuccess(response.data.message));
			})
			.catch((error) => {
				dispatch(createScheduleFail(error));
			});
	};
};

export const createScheduleStart = () => ({
	type: actionTypes.CREATE_SCHEDULE_START,
});

export const createScheduleSuccess = (message) => ({
	type: actionTypes.CREATE_SCHEDULE_SUCCESS,
	message,
});

export const createScheduleFail = (error) => ({
	type: actionTypes.CREATE_SCHEDULE_FAIL,
	error,
});

export const getScheduleByDate = (doctorId, date) => {
	return async (dispatch) => {
		dispatch(getScheduleByDateStart());
		await GetScheduleByDateService(doctorId, date)
			.then((response) => {
				dispatch(getScheduleByDateSuccess(response.data));
			})
			.catch((error) => {
				dispatch(getScheduleByDateFail(error));
			});
	};
};

export const getScheduleByDateStart = () => ({
	type: actionTypes.GET_SCHEDULE_BY_DATE_START,
});

export const getScheduleByDateSuccess = (data) => ({
	type: actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS,
	data,
});

export const getScheduleByDateFail = (error) => ({
	type: actionTypes.GET_SCHEDULE_BY_DATE_FAIL,
	error,
});
