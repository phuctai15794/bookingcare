import React from 'react';
import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';
import { PATHS, LocalStorage } from '../utils';

export const isAuthenticated = (ComponentWrapped) => {
	function HoCIsAuthenticated(props) {
		const isLoggedIn = Boolean(LocalStorage.get('isLoggedIn'));
		const location = useLocation();
		const redirectPath =
			(location.pathname && location.pathname !== PATHS.SYSTEM.HOME && `?back=${location.pathname}`) || '';
		return isLoggedIn ? <ComponentWrapped {...props} /> : <Redirect to={`${PATHS.SYSTEM.LOGIN}${redirectPath}`} />;
	}

	return HoCIsAuthenticated;
};

export const isNotAuthenticated = (ComponentWrapped) => {
	function HoCIsNotAuthenticated(props) {
		const isLoggedIn = Boolean(LocalStorage.get('isLoggedIn'));
		const location = useLocation();
		const { pathname, search } = location;
		const queryParams = new URLSearchParams(search);
		const redirectBack = queryParams.get('back');
		const redirectPath = pathname !== PATHS.SYSTEM.LOGIN ? pathname : redirectBack || PATHS.SYSTEM.HOME;
		return !isLoggedIn ? <ComponentWrapped {...props} /> : <Redirect to={redirectPath} />;
	}

	return HoCIsNotAuthenticated;
};
