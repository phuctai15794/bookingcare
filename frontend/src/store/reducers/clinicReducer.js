import actionTypes from '../actions/actionTypes';

const initialState = {
	clinics: [],
	loading: false,
	message: {
		status: '',
		text: '',
		type: '',
	},
	actions: {
		fetch: {
			loading: false,
			message: {
				text: '',
				type: '',
			},
		},
	},
};

const clinicReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_CLINIC_START:
			return {
				...state,
				actions: {
					...state.actions,
					fetch: {
						...state.actions.fetch,
						loading: true,
					},
				},
			};
		case actionTypes.FETCH_CLINIC_SUCCESS:
			return {
				...state,
				clinics: action.data,
				actions: {
					...state.actions,
					fetch: {
						...state.actions.fetch,
						loading: false,
						message: action.message,
					},
				},
			};
		case actionTypes.FETCH_CLINIC_FAIL:
			return {
				...state,
				clinics: [],
				actions: {
					...state.actions,
					fetch: {
						...state.actions.fetch,
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

export default clinicReducer;
