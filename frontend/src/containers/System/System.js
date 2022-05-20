import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isAuthenticated, isNotAuthenticated } from '../../hoc/Authentication';
import { AuthRoute, AdminRoute, DoctorRoute } from '../../routes/System';
import Header from '../../containers/System/Layouts/Header/Header';
import Footer from '../../containers/System/Layouts/Footer/Footer';
import Dashboard from '../../containers/System/Layouts/Dashboard';
import { PATHS, LocalStorage } from '../../utils';
import CheckAuth from './Auth/CheckAuth';
import Login from './Auth/Login';
import Loading from './Layouts/Loading/Loading';
import SystemStyles from '../../styles/System.module.scss';

class System extends Component {
	render() {
		const isLoggedIn = Boolean(LocalStorage.get('isLoggedIn'));

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
								<AuthRoute path={`${PATHS.SYSTEM.HOME}/admin`} role="ADMIN">
									<AdminRoute path={`${PATHS.SYSTEM.HOME}/admin`} />
								</AuthRoute>
								<AuthRoute path={`${PATHS.SYSTEM.HOME}/doctor`} role="DOCTOR">
									<DoctorRoute path={`${PATHS.SYSTEM.HOME}/doctor`} />
								</AuthRoute>
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
