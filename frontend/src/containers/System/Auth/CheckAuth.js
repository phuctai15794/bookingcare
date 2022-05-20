import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PATHS } from '../../../utils';

class CheckAuth extends Component {
	render() {
		const { isLoggedIn } = this.props;
		return <Redirect to={isLoggedIn ? PATHS.SYSTEM.DASHBOARD : PATHS.SYSTEM.LOGIN} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuth);
