import actionTypes from '../actions/actionTypes';

const allCodeState = {
	loading: false,
	data: [],
};

const initialState = {
	genders: {
		...allCodeState,
	},
	roles: {
		...allCodeState,
	},
	positions: {
		...allCodeState,
	},
	times: {
		...allCodeState,
	},
	prices: {
		...allCodeState,
	},
	payments: {
		...allCodeState,
	},
	provinces: {
		...allCodeState,
	},
};

const allCodeReducer = (state = initialState, action) => {
	let keyState, typeDataUpper, typeDataLower, actionStart, actionSuccess, actionFail;

	if (Object.keys(actionTypes).includes(action.type) && action.typeData) {
		typeDataUpper = action.typeData.toUpperCase();
		typeDataLower = action.typeData.toLowerCase();
		keyState = `${typeDataLower}s`;
		actionStart = actionTypes[`FETCH_${typeDataUpper}_START`];
		actionSuccess = actionTypes[`FETCH_${typeDataUpper}_SUCCESS`];
		actionFail = actionTypes[`FETCH_${typeDataUpper}_FAIL`];
	}

	switch (action.type) {
		case actionStart:
			return {
				...state,
				[keyState]: {
					...state[keyState],
					loading: true,
				},
			};
		case actionSuccess:
			return {
				...state,
				[keyState]: {
					...state[keyState],
					loading: false,
					data: action.data,
				},
			};
		case actionFail:
			return {
				...state,
				[keyState]: {
					...state[keyState],
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

export default allCodeReducer;
