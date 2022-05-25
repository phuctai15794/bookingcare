import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import allCodeReducer from './allCodeReducer';
import doctorReducer from './doctorReducer';
import scheduleReducer from './scheduleReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
	storage: storage,
	stateReconciler: autoMergeLevel2,
};

const appPersistConfig = {
	...persistCommonConfig,
	key: 'app',
	whitelist: ['language'],
};

const rootReducer = () =>
	combineReducers({
		app: persistReducer(appPersistConfig, appReducer),
		user: userReducer,
		allCode: allCodeReducer,
		doctor: doctorReducer,
		schedule: scheduleReducer,
	});

export default rootReducer;
