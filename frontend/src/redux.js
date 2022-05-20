import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { createStateSyncMiddleware } from 'redux-state-sync';
import { persistStore } from 'redux-persist';
import actionTypes from './store/actions/actionTypes';
import rootReducer from './store/reducers/rootReducer';

// Config state sync
const configStateSync = {
	whitelist: [actionTypes.CHANGE_LANGUAGE],
};

// Create middlewares reducer
const middleware = [thunkMiddleware, createStateSyncMiddleware(configStateSync)];

// Create store with reducer
const reduxStore = createStore(rootReducer(), {}, applyMiddleware(...middleware));

export const dispatch = reduxStore.dispatch;
export const persistor = persistStore(reduxStore);
export default reduxStore;
