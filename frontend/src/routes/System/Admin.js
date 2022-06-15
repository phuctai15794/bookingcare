import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../../containers/System/User/UserManage';
import DoctorManage from '../../containers/System/Doctor/DoctorManage';
import DoctorSchedule from '../../containers/System/Doctor/DoctorSchedule';
import SpecialtyManage from '../../containers/System/Specialty/SpecialtyManage';
import ClinicManage from '../../containers/System/Clinic/ClinicManage';
import { Constants } from '../../utils';

class AdminRoute extends Component {
	render() {
		return (
			<>
				<Switch>
					<Route path={`${Constants.PATHS.SYSTEM.HOME}/admin/user-manage`} component={UserManage} />
					<Route path={`${Constants.PATHS.SYSTEM.HOME}/admin/doctor-manage`} component={DoctorManage} />
					<Route path={`${Constants.PATHS.SYSTEM.HOME}/admin/schedule-manage`} component={DoctorSchedule} />
					<Route path={`${Constants.PATHS.SYSTEM.HOME}/admin/specialty-manage`} component={SpecialtyManage} />
					<Route path={`${Constants.PATHS.SYSTEM.HOME}/admin/clinic-manage`} component={ClinicManage} />
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

export default AdminRoute;
