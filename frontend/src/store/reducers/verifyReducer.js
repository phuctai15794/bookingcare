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
		case actionTypes.VERIFY_BOOKING_PATIENT_START:
			return {
				...state,
				bookingPatient: {
					...state.bookingPatient,
					loading: true,
				},
			};
		case actionTypes.VERIFY_BOOKING_PATIENT_SUCCESS:
			return {
				...state,
				bookingPatient: {
					...state.bookingPatient,
					loading: false,
					message: action.message,
				},
			};
		case actionTypes.VERIFY_BOOKING_PATIENT_FAIL:
			return {
				...state,
				bookingPatient: {
					...state.bookingPatient,
					loading: false,
					message: {
						text: 'Error. Please try again later',
						type: 'error',
					},
				},
			};
		default:
			return state;
	}
};

export default patientReducer;
