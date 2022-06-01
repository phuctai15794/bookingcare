import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Constants } from '../../utils';
import * as actions from '../../store/actions';
import VerifyStyles from './Verify.module.scss';

class VerifyBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			countdown: 5,
			isRedirect: false,
			message: {
				text: '',
				type: '',
			},
		};
		this.timerId = React.createRef();
	}

	async componentDidMount() {
		const { location, verifyBookingPatient } = this.props;
		const { search } = location;
		const queryParams = new URLSearchParams(search);
		const token = queryParams.get('token');
		const doctorId = queryParams.get('doctorId');

		if (token && doctorId) {
			await verifyBookingPatient({ token, doctorId });
			this.timerId.current = setInterval(() => {
				let { countdown } = this.state;
				this.setState({
					countdown: countdown > 0 ? countdown - 1 : 0,
				});
			}, 1000);
		} else {
			this.setState({
				isRedirect: true,
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { messageVerifyBookingPatient } = this.props;

		if (prevProps.messageVerifyBookingPatient !== messageVerifyBookingPatient) {
			this.setState({
				message: messageVerifyBookingPatient,
			});
		}

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
		const { isRedirect, message, countdown } = this.state;

		return !isRedirect ? (
			message.type ? (
				<div className={VerifyStyles.verifyMain}>
					<div
						className={`${VerifyStyles.verifyCard} ${
							message.type === 'success' ? VerifyStyles.success : VerifyStyles.error
						}`}
					>
						<div className={VerifyStyles.verifyIcon}>
							<i className={VerifyStyles.i}>{message.type === 'success' ? '✓' : '✕'}</i>
						</div>
						<h1 className={VerifyStyles.verifyStatus}>{message.type === 'success' ? 'Success' : 'Fail'}</h1>
						<p className={VerifyStyles.verifyMessage}>{message.text}</p>
						<NavLink className="btn btn-secondary" to={Constants.PATHS.MAIN.HOME}>
							<FormattedMessage id="app.back-to-home" />
							{` (${countdown}s)`}
						</NavLink>
					</div>
				</div>
			) : (
				''
			)
		) : (
			<Redirect to={Constants.PATHS.MAIN.HOME} />
		);
	}
}

const mapStateToProps = (state) => {
	return {
		messageVerifyBookingPatient: state.verify.bookingPatient.message,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		verifyBookingPatient: (token, doctorId) => dispatch(actions.verifyBookingPatient(token, doctorId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
