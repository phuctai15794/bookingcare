import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Redirect } from 'react-router-dom';
import { PATHS } from '../utils';

export const isAuthenticated = (ComponentWrapped) => {
<<<<<<< HEAD
	function IsAuthenticatedHoC(props) {
=======
	function HoCIsAuthenticated(props) {
>>>>>>> 96e0bfc8a2a3f285c8f828b3aefdc5a3b034a6a6
		const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
		const location = useLocation();
		const redirectPath =
			(location.pathname && location.pathname !== PATHS.SYSTEM.HOME && `?back=${location.pathname}`) || '';

		return isLoggedIn ? <ComponentWrapped {...props} /> : <Redirect to={`${PATHS.SYSTEM.LOGIN}${redirectPath}`} />;
	}

<<<<<<< HEAD
	return IsAuthenticatedHoC;
};

export const isNotAuthenticated = (ComponentWrapped) => {
	function IsNotAuthenticatedHoC(props) {
=======
	return HoCIsAuthenticated;
};

export const isNotAuthenticated = (ComponentWrapped) => {
	function HoCCheckIsNotAuthenticated(props) {
>>>>>>> 96e0bfc8a2a3f285c8f828b3aefdc5a3b034a6a6
		const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
		const location = useLocation();
		const { pathname, search } = location;
		const queryParams = new URLSearchParams(search);
		const redirectBack = queryParams.get('back');
		const redirectPath = pathname !== PATHS.SYSTEM.LOGIN ? pathname : redirectBack || PATHS.SYSTEM.HOME;

		return !isLoggedIn ? <ComponentWrapped {...props} /> : <Redirect to={redirectPath} />;
	}

<<<<<<< HEAD
	return IsNotAuthenticatedHoC;
=======
	return HoCCheckIsNotAuthenticated;
>>>>>>> 96e0bfc8a2a3f285c8f828b3aefdc5a3b034a6a6
};
