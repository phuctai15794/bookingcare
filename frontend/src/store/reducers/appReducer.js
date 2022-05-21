import actionTypes from '../actions/actionTypes';
import { Constants } from '../../utils';

const initialState = {
	language: Constants.LANGUAGES.VI,
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
