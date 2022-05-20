import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { PATHS, SYSTEM_ROLES, LocalStorage, Functions } from '../../utils';

const Auth = ({ children, role, ...rest }) => {
	const isLoggedIn = Boolean(LocalStorage.get('persist:user')?.isLoggedIn);
	const userInfo = Functions.jsonParse(LocalStorage.get('persist:user')?.userInfo);

	return (
		<Route
			{...rest}
			render={() => {
				return isLoggedIn ? (
					userInfo && userInfo.roleId === SYSTEM_ROLES[role.toUpperCase()] ? (
						children
					) : (
						<Redirect to={PATHS.SYSTEM.DASHBOARD} />
					)
				) : (
					<Redirect to={PATHS.SYSTEM.LOGIN} />
				);
			}}
		/>
	);
};

export default Auth;
