import actionTypes from '../actions/actionTypes';

const initialState = {
	loading: false,
	message: {
		text: '',
		type: '',
	},
};

const doctorReducer = (state = initialState, action) => {
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
		default:
			return state;
	}
};

export default doctorReducer;