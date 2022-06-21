import actionTypes from '../actions/actionTypes';

const initialState = {
	doctors: [],
	doctorDetail: null,
	doctorProfile: null,
	doctorInfo: null,
	doctorsInWeek: [],
	appointments: [],
	loading: false,
	actions: {
		sendRemedy: {
			loading: false,
			message: {
				text: '',
				type: '',
			},
		},
	},
	message: {
		text: '',
		type: '',
	},
};

const doctorReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_DOCTOR_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_DOCTOR_SUCCESS:
			return {
				...state,
				doctors: action.data,
				loading: false,
			};
		case actionTypes.FETCH_DOCTOR_FAIL:
			return {
				...state,
				doctors: [],
				loading: false,
			};
		case actionTypes.FETCH_DOCTOR_IN_WEEK_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_DOCTOR_IN_WEEK_SUCCESS:
			return {
				...state,
				doctorsInWeek: action.data,
				loading: false,
			};
		case actionTypes.FETCH_DOCTOR_IN_WEEK_FAIL:
			return {
				...state,
				doctorsInWeek: [],
				loading: false,
			};
		case actionTypes.FETCH_APPOINTMENT_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.FETCH_APPOINTMENT_SUCCESS:
			return {
				...state,
				appointments: action.data,
				loading: false,
			};
		case actionTypes.FETCH_APPOINTMENT_FAIL:
			return {
				...state,
				appointments: [],
				loading: false,
			};
		case actionTypes.SEND_REMEDY_START:
			return {
				...state,
				actions: {
					...state.actions,
					sendRemedy: {
						...state.actions.sendRemedy,
						loading: true,
					},
				},
			};
		case actionTypes.SEND_REMEDY_SUCCESS:
			return {
				...state,
				users: action.data,
				actions: {
					...state.actions,
					sendRemedy: {
						...state.actions.sendRemedy,
						loading: false,
						message: action.message,
					},
				},
			};
		case actionTypes.SEND_REMEDY_FAIL:
			return {
				...state,
				users: [],
				actions: {
					...state.actions,
					sendRemedy: {
						...state.actions.sendRemedy,
						loading: false,
						message: {
							text: 'Error. Please try again later',
							type: 'error',
						},
					},
				},
			};
		case actionTypes.UPDATE_INFO_DOCTOR_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.UPDATE_INFO_DOCTOR_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.message,
			};
		case actionTypes.UPDATE_INFO_DOCTOR_FAIL:
			return {
				...state,
				loading: false,
				message: {
					text: 'Error. Please try again later',
					type: 'error',
				},
			};
		case actionTypes.GET_DETAIL_DOCTOR_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
			return {
				...state,
				doctorDetail: action.data,
				loading: false,
			};
		case actionTypes.GET_DETAIL_DOCTOR_FAIL:
			return {
				...state,
				doctorDetail: null,
				loading: false,
			};
		case actionTypes.GET_PROFILE_DOCTOR_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.GET_PROFILE_DOCTOR_SUCCESS:
			return {
				...state,
				doctorProfile: action.data,
				loading: false,
			};
		case actionTypes.GET_PROFILE_DOCTOR_FAIL:
			return {
				...state,
				doctorProfile: null,
				loading: false,
			};
		case actionTypes.GET_INFO_DOCTOR_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.GET_INFO_DOCTOR_SUCCESS:
			return {
				...state,
				doctorInfo: action.data,
				loading: false,
			};
		case actionTypes.GET_INFO_DOCTOR_FAIL:
			return {
				...state,
				doctorInfo: null,
				loading: false,
			};
		default:
			return state;
	}
};

export default doctorReducer;
