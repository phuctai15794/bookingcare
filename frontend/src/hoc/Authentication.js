import React from 'react';
import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Constants, LocalStorage } from '../utils';

export const isAuthenticated = (ComponentWrapped) => {
	function HoCIsAuthenticated(props) {
		const isLoggedIn = Boolean(LocalStorage.get('isLoggedIn'));
		const location = useLocation();
		const redirectPath =
			(location.pathname && location.pathname !== Constants.PATHS.SYSTEM.HOME && `?back=${location.pathname}`) ||
			'';
		return isLoggedIn ? (
			<ComponentWrapped {...props} />
		) : (
			<Redirect to={`${Constants.PATHS.SYSTEM.LOGIN}${redirectPath}`} />
		);
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
		const redirectPath =
			pathname !== Constants.PATHS.SYSTEM.LOGIN ? pathname : redirectBack || Constants.PATHS.SYSTEM.HOME;
		return !isLoggedIn ? <ComponentWrapped {...props} /> : <Redirect to={redirectPath} />;
	}

	return HoCIsNotAuthenticated;
};
