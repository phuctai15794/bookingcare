import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isNotAuthenticated } from '../../hoc/Authentication';
import { AuthRoute, AdminRoute, DoctorRoute, DashboardRoute } from '../../routes/System';
import Header from '../../containers/System/Layouts/Header/Header';
import Footer from '../../containers/System/Layouts/Footer/Footer';
import { PATHS, LocalStorage } from '../../utils';
import CheckAuth from './Auth/CheckAuth';
import Login from './Auth/Login';
import Loading from './Layouts/Loading/Loading';
import SystemStyles from '../../styles/System.module.scss';

class System extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: Boolean(LocalStorage.get('isLoggedIn')),
		};
	}

	componentDidUpdate(prevState) {
		const { isLoggedIn } = this.props;

		if (prevState.isLoggedIn !== isLoggedIn) {
			this.setState({
				isLoggedIn,
			});
		}
	}

	render() {
		const { isLoggedIn } = this.state;

		return (
			<>
				{isLoggedIn && <Header />}
				<Switch>
					<Route path="/" exact component={CheckAuth} />
					<Route path={PATHS.SYSTEM.LOGIN} component={isNotAuthenticated(Login)} />
					<>
						<div className={`${SystemStyles.blockContent} py-4`}>
							<Switch>
								<AuthRoute path={PATHS.SYSTEM.DASHBOARD} component={DashboardRoute} />
								<AuthRoute path={`${PATHS.SYSTEM.HOME}/admin`} component={AdminRoute} role="ADMIN" />
								<AuthRoute path={`${PATHS.SYSTEM.HOME}/doctor`} component={DoctorRoute} role="DOCTOR" />
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
