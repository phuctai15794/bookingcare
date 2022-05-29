import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { Constants } from '../utils';
import '../styles/Styles.scss';
import Main from './Main/Main';
import System from './System/System';

class App extends Component {
	componentDidMount() {
		const { language } = this.props;

		moment.updateLocale(language, {
			weekdays: Constants.DATE_FORMAT.DAY_LOCALE[language],
			calendar: {
				sameDay: `[${Constants.DATE_FORMAT.CALENDER.SAME_DAY[language]}] - ${Constants.DATE_FORMAT.STANDARD}`,
			},
		});
	}

	render() {
		return (
			<Router>
				<div className="main">
					<Switch>
						<Route path={Constants.PATHS.SYSTEM.HOME} component={System} />
						<Route path={Constants.PATHS.MAIN.HOME} component={Main} />
					</Switch>
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
					/>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
