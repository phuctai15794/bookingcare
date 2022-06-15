import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DoctorSchedule from '../../containers/System/Doctor/DoctorSchedule';
import DoctorPatient from '../../containers/System/Doctor/DoctorPatient';
import { Constants } from '../../utils';

class DoctorRoute extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route path={`${Constants.PATHS.SYSTEM.HOME}/doctor/schedule-manage`} component={DoctorSchedule} />
					<Route path={`${Constants.PATHS.SYSTEM.HOME}/doctor/patient-manage`} component={DoctorPatient} />
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
