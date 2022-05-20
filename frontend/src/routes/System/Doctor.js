import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DoctorSchedule from '../../containers/System/Doctor/DoctorSchedule';
import { PATHS } from '../../utils';

class Doctor extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route path={`${PATHS.SYSTEM.HOME}/doctor/doctor-schedule`} component={DoctorSchedule} />
					<Route
						component={() => {
							return <Redirect to={PATHS.SYSTEM.DASHBOARD} />;
						}}
					/>
				</Switch>
			</>
		);
	}
}

export default Doctor;
