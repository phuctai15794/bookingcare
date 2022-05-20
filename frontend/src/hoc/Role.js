import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PATHS } from '../utils';

export const hasRole = (ComponentWrapped, Role) => {
	function HoCCheckRole(props) {
		const userInfo = useSelector((state) => state.user.userInfo);

		return userInfo && userInfo.roleId === Role ? (
			<ComponentWrapped {...props} />
		) : (
			<Redirect to={PATHS.SYSTEM.DASHBOARD} />
		);
	}

	return HoCCheckRole;
};
