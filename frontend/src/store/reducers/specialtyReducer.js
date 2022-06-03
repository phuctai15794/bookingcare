import actionTypes from '../actions/actionTypes';

const initialState = {
	specialtiesHome: [],
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
		create: {
			loading: false,
			message: {
				text: '',
				type: '',
			},
		},
	},
};

const specialtyReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_SPECIALTY_HOME_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_SPECIALTY_HOME_SUCCESS:
			return {
				...state,
				specialtiesHome: action.data,
				loading: false,
			};
		case actionTypes.FETCH_SPECIALTY_HOME_FAIL:
			return {
				...state,
				specialtiesHome: [],
				loading: false,
			};
		case actionTypes.CREATE_SPECIALTY_START:
			return {
				...state,
				actions: {
					...state.actions,
					create: {
						...state.actions.create,
						loading: true,
					},
				},
			};
		case actionTypes.CREATE_SPECIALTY_SUCCESS:
			return {
				...state,
				actions: {
					...state.actions,
					create: {
						...state.actions.create,
						loading: false,
						message: action.message,
					},
				},
			};
		case actionTypes.CREATE_SPECIALTY_FAIL:
			return {
				...state,
				actions: {
					...state.actions,
					create: {
						...state.actions.create,
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

export default specialtyReducer;
