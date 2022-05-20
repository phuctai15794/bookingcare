import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isAuthenticated, isNotAuthenticated } from '../../hoc/Authentication';
<<<<<<< HEAD
import { AuthRoute, AdminRoute, DoctorRoute } from '../../routes/System';
=======
import { hasRole } from '../../hoc/Role';
import { Admin, Doctor } from '../../routes/System';
>>>>>>> 96e0bfc8a2a3f285c8f828b3aefdc5a3b034a6a6
import Header from '../../containers/System/Layouts/Header/Header';
import Footer from '../../containers/System/Layouts/Footer/Footer';
import Dashboard from '../../containers/System/Layouts/Dashboard';
import { PATHS } from '../../utils';
import CheckAuth from './Auth/CheckAuth';
import Login from './Auth/Login';
import Loading from './Layouts/Loading/Loading';
import SystemStyles from '../../styles/System.module.scss';

class System extends Component {
	render() {
		const { isLoggedIn } = this.props;

		return (
			<>
				{isLoggedIn && <Header />}
				<Switch>
					<Route path="/" exact component={CheckAuth} />
					<Route path={PATHS.SYSTEM.LOGIN} component={isNotAuthenticated(Login)} />
					<>
						<div className={`${SystemStyles.blockContent} py-4`}>
							<Switch>
								<Route path={PATHS.SYSTEM.DASHBOARD} component={isAuthenticated(Dashboard)} />
<<<<<<< HEAD
								<AuthRoute path={`${PATHS.SYSTEM.HOME}/admin`} role="ADMIN">
									<AdminRoute path={`${PATHS.SYSTEM.HOME}/admin`} />
								</AuthRoute>
								<AuthRoute path={`${PATHS.SYSTEM.HOME}/doctor`} role="DOCTOR">
									<DoctorRoute path={`${PATHS.SYSTEM.HOME}/doctor`} />
								</AuthRoute>
=======
								<Route
									path={`${PATHS.SYSTEM.HOME}/admin`}
									component={isAuthenticated(hasRole(Admin, SYSTEM_ROLES.ADMIN))}
								/>
								<Route
									path={`${PATHS.SYSTEM.HOME}/doctor`}
									component={isAuthenticated(hasRole(Doctor, SYSTEM_ROLES.DOCTOR))}
								/>
>>>>>>> 96e0bfc8a2a3f285c8f828b3aefdc5a3b034a6a6
								<Route
									component={() => {
										return <Redirect to={PATHS.SYSTEM.DASHBOARD} />;
									}}
								/>
							</Switch>
						</div>
					</>
				</Switch>
				{isLoggedIn && <Footer />}
				<Loading />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
