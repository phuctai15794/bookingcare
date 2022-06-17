import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DoctorSchedule from '../../containers/System/Doctor/DoctorSchedule';
import DoctorAppointment from '../../containers/System/Doctor/DoctorAppointment';
import { Constants } from '../../utils';

class DoctorRoute extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route path={`${Constants.PATHS.SYSTEM.HOME}/doctor/schedule-manage`} component={DoctorSchedule} />
					<Route
						path={`${Constants.PATHS.SYSTEM.HOME}/doctor/appointment-manage`}
						component={DoctorAppointment}
					/>
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
