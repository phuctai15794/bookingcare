import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import SystemStyles from '../../../styles/System.module.scss';

class Dashboard extends Component {
	render() {
		return (
			<>
				<div className={SystemStyles.titleMain}>
					<FormattedMessage id="menu.admin.dashboard.name" />
				</div>
				<div className={SystemStyles.contentMain}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
