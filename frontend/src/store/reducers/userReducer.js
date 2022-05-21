import actionTypes from '../actions/actionTypes';
import { LocalStorage } from '../../utils';

const initialState = {
	iseLoggedIn: false,
	userInfo: null,
	users: [],
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
		update: {
			loading: false,
			message: {
				text: '',
				type: '',
			},
		},
		delete: {
			loading: false,
			message: {
				text: '',
				type: '',
			},
		},
	},
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_USER_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.LOGIN_USER_SUCCESS:
			let newsState = null;
			const message = action.data.message;

			if (message.type === 'success') {
				LocalStorage.set('isLoggedIn', '1');
				LocalStorage.set('userInfo', action.data.data);
				LocalStorage.set('accessToken', action.data.accessToken);
				LocalStorage.set('refreshToken', action.data.refreshToken);

				newsState = {
					...state,
					isLoggedIn: true,
					userInfo: action.data.data,
					loading: false,
				};
			} else {
				LocalStorage.set('isLoggedIn', '');
				LocalStorage.set('userInfo', null);
				LocalStorage.set('accessToken', '');
				LocalStorage.set('refreshToken', '');

				newsState = {
					...state,
					isLoggedIn: false,
					userInfo: null,
					loading: false,
					message: {
						...state.message,
						text: message.text,
						type: message.type,
					},
				};
			}

			return newsState;
		case actionTypes.LOGIN_USER_FAIL:
			return {
				...state,
				loading: false,
				message: {
					text: 'Error. Please try again later',
					type: 'error',
				},
			};
		case actionTypes.LOGOUT_USER_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.LOGOUT_USER_DONE:
			LocalStorage.set('isLoggedIn', '');
			LocalStorage.set('userInfo', null);
			LocalStorage.set('accessToken', '');
			LocalStorage.set('refreshToken', '');

			return {
				...state,
				isLoggedIn: false,
				userInfo: null,
				loading: false,
			};
		case actionTypes.REFRESH_TOKEN_USER:
			LocalStorage.set('accessToken', action.data.newAccessToken);
			LocalStorage.set('refreshToken', action.data.newRefreshToken);

			return {
				...state,
				message: action.data.message,
			};
		case actionTypes.RESET_ACTION_USER:
			return {
				...state,
				actions: {
					...state.actions,
					[action.action]: {
						...state.actions[action.action],
						message: {
							text: '',
							type: '',
						},
					},
				},
			};
		case actionTypes.FETCH_USER_START:
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
		case actionTypes.FETCH_USER_SUCCESS:
			return {
				...state,
				users: action.data,
				actions: {
					...state.actions,
					fetch: {
						...state.actions.fetch,
						loading: false,
						message: action.message,
					},
				},
			};
		case actionTypes.FETCH_USER_FAIL:
			return {
				...state,
				users: [],
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
		case actionTypes.CREATE_USER_START:
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
		case actionTypes.CREATE_USER_SUCCESS:
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
		case actionTypes.CREATE_USER_FAIL:
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
		case actionTypes.UPDATE_USER_START:
			return {
				...state,
				actions: {
					...state.actions,
					update: {
						...state.actions.update,
						loading: true,
					},
				},
			};
		case actionTypes.UPDATE_USER_SUCCESS:
			return {
				...state,
				actions: {
					...state.actions,
					update: {
						...state.actions.update,
						loading: false,
						message: action.message,
					},
				},
			};
		case actionTypes.UPDATE_USER_FAIL:
			return {
				...state,
				actions: {
					...state.actions,
					update: {
						...state.actions.update,
						loading: false,
						message: {
							text: 'Error. Please try again later',
							type: 'error',
						},
					},
				},
			};
		case actionTypes.DELETE_USER_START:
			return {
				...state,
				actions: {
					...state.actions,
					delete: {
						...state.actions.delete,
						loading: true,
					},
				},
			};
		case actionTypes.DELETE_USER_SUCCESS:
			return {
				...state,
				actions: {
					...state.actions,
					delete: {
						...state.actions.delete,
						loading: false,
						message: action.message,
					},
				},
			};
		case actionTypes.DELETE_USER_FAIL:
			return {
				...state,
				actions: {
					...state.actions,
					delete: {
						...state.actions.delete,
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

export default userReducer;
