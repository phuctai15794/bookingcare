import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../../store/actions';
import { PATHS, SYSTEM_ROLES, SYSTEM_MENUS, LANGUAGES } from '../../../../utils';
import Menu from '../Menu/Menu';
import SystemStyles from '../../../../styles/System.module.scss';
import HeaderStyles from './Header.module.scss';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			menus: [],
		};
	}

	handleChangeLanguage = (language) => {
		const { changeLanguage } = this.props;
		changeLanguage(language);
	};

	componentDidMount() {
		const { userInfo } = this.props;
		let menus = [];

		if (userInfo) {
			if (userInfo.roleId === SYSTEM_ROLES.ADMIN) {
				menus = SYSTEM_MENUS.ADMIN;
			} else if (userInfo.roleId === SYSTEM_ROLES.DOCTOR) {
				menus = SYSTEM_MENUS.DOCTOR;
			}
		}

		this.setState({
			menus,
		});
	}

	render() {
		const { logoutUser, userInfo, language } = this.props;
		const { menus } = this.state;

		return (
			<div className={`${HeaderStyles.header} bg-primary border-bottom`}>
				<div className={`${SystemStyles.blockContent} ${HeaderStyles.blockContent}`}>
					<Menu menus={menus} />

					<div className={HeaderStyles.headerAccount}>
						<FormattedMessage id="app.welcome" />, {`${userInfo && userInfo.firstName} !`}
					</div>

					<div className={HeaderStyles.headerLang}>
						<span
							className={language === LANGUAGES.VI ? HeaderStyles.active : ''}
							onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
						>
							VN
						</span>{' '}
						/{' '}
						<span
							className={language === LANGUAGES.EN ? HeaderStyles.active : ''}
							onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
						>
							EN
						</span>
					</div>

					<div className={HeaderStyles.headerViewWebsite}>
						<a
							className="btn btn-sm btn-warning"
							href={PATHS.MAIN.HOME}
							target="_blank"
							rel="noopener noreferrer"
						>
							<i>
								<FontAwesomeIcon icon={faShareSquare} />
							</i>
						</a>
					</div>

					<div className={HeaderStyles.headerLogout}>
						<a className="btn btn-sm btn-danger" href="# " onClick={logoutUser} title="Logout">
							<i>
								<FontAwesomeIcon icon={faSignOutAlt} />
							</i>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		userInfo: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
		logoutUser: () => dispatch(actions.logoutUser()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
