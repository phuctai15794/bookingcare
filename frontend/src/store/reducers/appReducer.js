import actionTypes from '../actions/actionTypes';
import { LANGUAGES } from '../../utils';

const initialState = {
	language: LANGUAGES.VI,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CHANGE_LANGUAGE:
			return {
				...state,
				language: action.language,
			};
		default:
			return state;
	}
};

export default appReducer;
