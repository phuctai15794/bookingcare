import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { isNotAuthenticated } from '../../hoc/Authentication';
import { AuthRoute, AdminRoute, DoctorRoute, DashboardRoute } from '../../routes/System';
import { Constants, LocalStorage } from '../../utils';
import Header from '../../containers/System/Layouts/Header/Header';
import Footer from '../../containers/System/Layouts/Footer/Footer';
import Home from './Layouts/Home/Home';
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
					<Route path={Constants.PATHS.SYSTEM.HOME} exact component={Home} />
					<Route path={Constants.PATHS.SYSTEM.LOGIN} component={isNotAuthenticated(Login)} />
					<>
						<div className={`${SystemStyles.blockContent} py-4`}>
							<Switch>
								<AuthRoute path={Constants.PATHS.SYSTEM.DASHBOARD} component={DashboardRoute} />
								<AuthRoute
									path={`${Constants.PATHS.SYSTEM.HOME}/admin`}
									component={AdminRoute}
									role="ADMIN"
								/>
								<AuthRoute
									path={`${Constants.PATHS.SYSTEM.HOME}/doctor`}
									component={DoctorRoute}
									role="DOCTOR"
								/>
								<Route
									component={() => {
										return <Redirect to={Constants.PATHS.SYSTEM.DASHBOARD} />;
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
