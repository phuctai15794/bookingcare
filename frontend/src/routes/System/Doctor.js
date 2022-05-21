import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DoctorSchedule from '../../containers/System/Doctor/DoctorSchedule';
import { Constants } from '../../utils';

class DoctorRoute extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route path={`${Constants.PATHS.SYSTEM.HOME}/doctor/doctor-schedule`} component={DoctorSchedule} />
					<Route
						component={() => {
							return <Redirect to={Constants.PATHS.SYSTEM.DASHBOARD} />;
						}}
					/>
				</Switch>
			</>
		);
	}
}

export default DoctorRoute;
