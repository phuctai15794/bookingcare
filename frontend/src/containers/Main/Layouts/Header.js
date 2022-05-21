import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/actions';
import { Constants } from '../../../utils';
import MainStyles from '../../../styles/Main.module.scss';
import HeaderStyles from './Header.module.scss';

class Header extends Component {
	handleChangeLanguage = (language) => {
		const { changeLanguage } = this.props;
		changeLanguage(language);
	};

	render() {
		const { language } = this.props;

		return (
			<>
				<div className={HeaderStyles.header}>
					<div className={`${MainStyles.blockContent} ${HeaderStyles.blockContent}`}>
						<div className={HeaderStyles.headerLeft}>
							<div className={HeaderStyles.headerMenu}>
								<i>
									<FontAwesomeIcon icon={faBars} />
								</i>
							</div>
							<Link className={HeaderStyles.headerLogo} to={Constants.PATHS.MAIN.HOME}></Link>
						</div>
						<div className={HeaderStyles.headerCenter}>
							<div className={HeaderStyles.headerLink}>
								<h3 className={HeaderStyles.headerLinkName}>
									<FormattedMessage id="header.link.specialist.name" />
								</h3>
								<span className={HeaderStyles.headerLinkDesc}>
									<FormattedMessage id="header.link.specialist.desc" />
								</span>
							</div>
							<div className={HeaderStyles.headerLink}>
								<h3 className={HeaderStyles.headerLinkName}>
									<FormattedMessage id="header.link.health-facilities.name" />
								</h3>
								<span className={HeaderStyles.headerLinkDesc}>
									<FormattedMessage id="header.link.health-facilities.desc" />
								</span>
							</div>
							<div className={HeaderStyles.headerLink}>
								<h3 className={HeaderStyles.headerLinkName}>
									<FormattedMessage id="header.link.doctor.name" />
								</h3>
								<span className={HeaderStyles.headerLinkDesc}>
									<FormattedMessage id="header.link.doctor.desc" />
								</span>
							</div>
							<div className={HeaderStyles.headerLink}>
								<h3 className={HeaderStyles.headerLinkName}>
									<FormattedMessage id="header.link.examination-package.name" />
								</h3>
								<span className={HeaderStyles.headerLinkDesc}>
									<FormattedMessage id="header.link.examination-package.desc" />
								</span>
							</div>
						</div>
						<div className={HeaderStyles.headerRight}>
							<div className={HeaderStyles.headerLang}>
								<span
									className={language === Constants.LANGUAGES.VI ? HeaderStyles.active : ''}
									onClick={() => this.handleChangeLanguage(Constants.LANGUAGES.VI)}
								>
									VN
								</span>{' '}
								/{' '}
								<span
									className={language === Constants.LANGUAGES.EN ? HeaderStyles.active : ''}
									onClick={() => this.handleChangeLanguage(Constants.LANGUAGES.EN)}
								>
									EN
								</span>
							</div>
							<div className={HeaderStyles.headerSupport}>
								<i>
									<FontAwesomeIcon icon={faQuestionCircle} />
								</i>
								<strong>
									<FormattedMessage id="header.support" />
								</strong>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
