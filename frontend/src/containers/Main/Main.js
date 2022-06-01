import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Constants } from '../../utils';
import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer';
import Home from './Home/Home';
import NotFound from './Layouts/NotFound/NotFound';
import Loading from './Layouts/Loading/Loading';
import DoctorDetail from './Doctor/DoctorDetail';

class Main extends Component {
	render() {
		return (
			<>
				<Header />
				<Switch>
					<Route path={Constants.PATHS.MAIN.HOME} exact component={Home} />
					<>
						<div className="contain">
							<Switch>
								<Route path={`${Constants.PATHS.MAIN.DOCTOR_DETAIL}/:id`} component={DoctorDetail} />
								<Route component={NotFound} />
							</Switch>
						</div>
					</>
				</Switch>
				<Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
