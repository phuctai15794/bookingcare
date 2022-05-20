import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../../containers/System/User/UserManage';
import DoctorManage from '../../containers/System/Doctor/DoctorManage';
import DoctorSchedule from '../../containers/System/Doctor/DoctorSchedule';
import { PATHS } from '../../utils';

class Admin extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route path={`${PATHS.SYSTEM.HOME}/admin/user-manage`} component={UserManage} />
					<Route path={`${PATHS.SYSTEM.HOME}/admin/doctor-manage`} component={DoctorManage} />
					<Route path={`${PATHS.SYSTEM.HOME}/admin/doctor-schedule`} component={DoctorSchedule} />
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

export default Admin;
