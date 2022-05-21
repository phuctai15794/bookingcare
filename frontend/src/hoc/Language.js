import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { Languages } from '../utils';

class Language extends Component {
	render() {
		const { children, language } = this.props;
		const messages = Languages.getFlattenedMessages();

		return (
			<IntlProvider locale={language} messages={messages[language]} defaultLocale="vi">
				{children}
			</IntlProvider>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

export default connect(mapStateToProps, null)(Language);
