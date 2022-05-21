import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../containers/System/Layouts/Dashboard';
import { PATHS } from '../../utils';

class DashboardRoute extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route path={PATHS.SYSTEM.DASHBOARD} component={Dashboard} />
				</Switch>
			</>
		);
	}
}

export default DashboardRoute;
