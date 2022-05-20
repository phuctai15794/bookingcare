import React from 'react';
import { Redirect } from 'react-router-dom';
import { PATHS, LocalStorage } from '../utils';

export const hasRole = (ComponentWrapped, Role) => {
	function HoCCheckRole(props) {
		const userInfo = LocalStorage.get('userInfo');

		return userInfo && userInfo.roleId === Role ? (
			<ComponentWrapped {...props} />
		) : (
			<Redirect to={PATHS.SYSTEM.DASHBOARD} />
		);
	}

	return HoCCheckRole;
};
