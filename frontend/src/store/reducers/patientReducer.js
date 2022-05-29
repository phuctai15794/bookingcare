import actionTypes from '../actions/actionTypes';

const initialState = {
	actions: {
		booking: {
			loading: false,
			message: {
				text: '',
				type: '',
			},
		},
	},
};

const patientReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.BOOKING_PATIENT_START:
			return {
				...state,
				actions: {
					...state.actions,
					booking: {
						...state.actions.booking,
						loading: true,
					},
				},
			};
		case actionTypes.BOOKING_PATIENT_SUCCESS:
			return {
				...state,
				users: action.data,
				actions: {
					...state.actions,
					booking: {
						...state.actions.booking,
						loading: false,
						message: action.message,
					},
				},
			};
		case actionTypes.BOOKING_PATIENT_FAIL:
			return {
				...state,
				users: [],
				actions: {
					...state.actions,
					booking: {
						...state.actions.booking,
						loading: false,
						message: {
							text: 'Error. Please try again later',
							type: 'error',
						},
					},
				},
			};
		default:
			return state;
	}
};

export default patientReducer;
