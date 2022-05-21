import React from 'react';
import { useLocation } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { Constants, LocalStorage } from '../../utils';

const AuthRoute = ({ component: Component, role, ...rest }) => {
	const isLoggedIn = Boolean(LocalStorage.get('isLoggedIn'));
	const userInfo = LocalStorage.get('userInfo');
	const location = useLocation();
	const redirectPath =
		(location.pathname && location.pathname !== Constants.PATHS.SYSTEM.HOME && `?back=${location.pathname}`) || '';

	return (
		<Route
			{...rest}
			render={(...props) => {
				return isLoggedIn ? (
					role ? (
						userInfo && userInfo.roleId === Constants.SYSTEM_ROLES[role.toUpperCase()] ? (
							<Component {...props} />
						) : (
							<Redirect to={Constants.PATHS.SYSTEM.DASHBOARD} />
						)
					) : (
						<Component {...props} />
					)
				) : (
					<Redirect to={`${Constants.PATHS.SYSTEM.LOGIN}${redirectPath}`} />
				);
			}}
		/>
	);
};

export default AuthRoute;
