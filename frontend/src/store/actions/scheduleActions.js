import actionTypes from './actionTypes';
import { CreateScheduleService } from '../../services/scheduleService';

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
