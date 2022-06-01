import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Constants } from '../../utils';
import * as actions from '../../store/actions';

class VerifyBooking extends Component {
	componentDidUpdate(prevProps) {
		const { messageVerifyBookingPatient } = this.props;

		if (prevProps.messageVerifyBookingPatient !== messageVerifyBookingPatient) {
			console.log(messageVerifyBookingPatient);
		}
	}
	render() {
		const { search } = this.props.location;
		const queryParams = new URLSearchParams(search);
		const token = queryParams.get('token');
		const doctorId = queryParams.get('doctorId');

		if (token && doctorId) {
			return <>Hello Verify Booking</>;
		} else {
			return <Redirect to={Constants.PATHS.MAIN.HOME} />;
		}
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
