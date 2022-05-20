import React, { Component } from 'react';
import { connect } from 'react-redux';
import SystemStyles from '../../../../styles/System.module.scss';
import FooterStyles from './Footer.module.scss';

class Footer extends Component {
	render() {
		return (
			<div className={FooterStyles.footer}>
				<div className={`${SystemStyles.blockContent} ${FooterStyles.blockContent}`}>Administrator</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
