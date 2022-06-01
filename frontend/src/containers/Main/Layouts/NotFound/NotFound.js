import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Constants } from '../../../../utils';
import './NotFound.scss';

class NotFound extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countdown: 5,
			isRedirect: false,
		};
		this.timerId = React.createRef();
	}

	componentDidMount() {
		this.timerId.current = setInterval(() => {
			let { countdown } = this.state;
			this.setState({
				countdown: countdown > 0 ? countdown - 1 : 0,
			});
		}, 1000);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.countdown === 0) {
			this.setState({
				isRedirect: true,
			});
		}
	}

	componentWillUnmount() {
		if (this.timerId.current) {
			clearInterval(this.timerId.current);
		}
	}

	render() {
		const { isRedirect, countdown } = this.state;

		return !isRedirect ? (
			<div className="error-template">
				<h1>Oops!</h1>
				<h2>
					<FormattedMessage id="app.not-found-title" />
				</h2>
				<div className="error-details">
					<FormattedMessage id="app.not-found-message" />
				</div>
				<div className="error-actions">
					<NavLink className="btn btn-primary" to={Constants.PATHS.MAIN.HOME}>
						<FormattedMessage id="app.back-to-home" />
						{` (${countdown}s)`}
					</NavLink>
				</div>
			</div>
		) : (
			<Redirect to={Constants.PATHS.MAIN.HOME} />
		);
	}
}

export default NotFound;
