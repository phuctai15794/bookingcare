import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Constants, LocalStorage } from '../../../../utils';

class Home extends Component {
	render() {
		const isLoggedIn = Boolean(LocalStorage.get('isLoggedIn'));
		return <Redirect to={isLoggedIn ? Constants.PATHS.SYSTEM.DASHBOARD : Constants.PATHS.SYSTEM.LOGIN} />;
	}
}

export default Home;
