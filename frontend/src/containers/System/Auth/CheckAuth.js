import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PATHS, LocalStorage } from '../../../utils';

class CheckAuth extends Component {
	render() {
		const isLoggedIn = Boolean(LocalStorage.get('isLoggedIn'));
		return <Redirect to={isLoggedIn ? PATHS.SYSTEM.DASHBOARD : PATHS.SYSTEM.LOGIN} />;
	}
}

export default CheckAuth;
