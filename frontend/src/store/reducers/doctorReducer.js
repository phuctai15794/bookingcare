import actionTypes from '../actions/actionTypes';

const initialState = {
	doctors: [],
	doctorDetail: null,
	doctorsInWeek: [],
	loading: false,
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
		case actionTypes.CREATE_SCHEDULE_DOCTOR_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.CREATE_SCHEDULE_DOCTOR_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.message,
			};
		case actionTypes.CREATE_SCHEDULE_DOCTOR_FAIL:
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
