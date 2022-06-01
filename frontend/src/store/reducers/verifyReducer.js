import actionTypes from '../actions/actionTypes';

const initialState = {
	bookingPatient: {
		loading: false,
		message: {
			text: '',
			type: '',
		},
	},
};

const patientReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.VERIFY_BOOKING_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.VERIFY_BOOKING_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.message,
			};
		case actionTypes.VERIFY_BOOKING_FAIL:
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

export default patientReducer;
