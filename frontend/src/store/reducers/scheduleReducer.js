import actionTypes from '../actions/actionTypes';

const initialState = {
	schedulesByDate: [],
	loading: false,
	message: {
		text: '',
		type: '',
	},
};

const scheduleReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CREATE_SCHEDULE_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.CREATE_SCHEDULE_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.message,
			};
		case actionTypes.CREATE_SCHEDULE_FAIL:
			return {
				...state,
				loading: false,
				message: {
					text: 'Error. Please try again later',
					type: 'error',
				},
			};
		case actionTypes.GET_SCHEDULE_BY_DATE_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.GET_SCHEDULE_BY_DATE_SUCCESS:
			return {
				...state,
				schedulesByDate: action.data.data,
				loading: false,
				message: action.data.message,
			};
		case actionTypes.GET_SCHEDULE_BY_DATE_FAIL:
			return {
				...state,
				schedulesByDate: [],
				loading: false,
				message: {
					text: 'Error. Please try again later',
					type: 'error',
				},
			};
		default:
			return state;
	}
};

export default scheduleReducer;
