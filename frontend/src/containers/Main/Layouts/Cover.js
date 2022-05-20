import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MainStyles from '../../../styles/Main.module.scss';
import CoverStyles from './Cover.module.scss';

class Cover extends Component {
	render() {
		const { intl } = this.props;
		const searchPlaceholder = intl.formatMessage({ id: 'search.placeholder' });

		return (
			<>
				<div className={CoverStyles.cover}>
					<div className={CoverStyles.coverContain}>
						<div className={CoverStyles.coverTitle}>
							<div className={CoverStyles.coverTitleFirst}>
								<FormattedMessage id="cover.title.first" />
							</div>
							<div className={CoverStyles.coverTitleSecond}>
								<FormattedMessage id="cover.title.second" />
							</div>
						</div>
						<div className={CoverStyles.coverSearch}>
							<i>
								<FontAwesomeIcon icon={faSearch} />
							</i>
							<input type="text" placeholder={`${searchPlaceholder} ...`} />
						</div>
						<div className={CoverStyles.coverOptions}>
							<div className={`${MainStyles.blockContent} ${CoverStyles.blockContent}`}>
								<div className={CoverStyles.coverLink} id={CoverStyles.khamChuyenKhoa}>
									<div className={CoverStyles.coverImage}></div>
									<h3 className={CoverStyles.coverName}>
										<FormattedMessage id="cover.link.specialist-examination" />
									</h3>
								</div>
								<div className={CoverStyles.coverLink} id={CoverStyles.khamTuXa}>
									<div className={CoverStyles.coverImage}></div>
									<h3 className={CoverStyles.coverName}>
										<FormattedMessage id="cover.link.remote-examination" />
									</h3>
								</div>
								<div className={CoverStyles.coverLink} id={CoverStyles.khamTongQuat}>
									<div className={CoverStyles.coverImage}></div>
									<h3 className={CoverStyles.coverName}>
										<FormattedMessage id="cover.link.general-examination" />
									</h3>
								</div>
								<div className={CoverStyles.coverLink} id={CoverStyles.xetNghiemYHoc}>
									<div className={CoverStyles.coverImage}></div>
									<h3 className={CoverStyles.coverName}>
										<FormattedMessage id="cover.link.medical-test" />
									</h3>
								</div>
								<div className={CoverStyles.coverLink} id={CoverStyles.sucKhoeTinhThan}>
									<div className={CoverStyles.coverImage}></div>
									<h3 className={CoverStyles.coverName}>
										<FormattedMessage id="cover.link.mental-health" />
									</h3>
								</div>
								<div className={CoverStyles.coverLink} id={CoverStyles.khamNhaKhoa}>
									<div className={CoverStyles.coverImage}></div>
									<h3 className={CoverStyles.coverName}>
										<FormattedMessage id="cover.link.dental-examination" />
									</h3>
								</div>
								<div className={CoverStyles.coverLink} id={CoverStyles.goiPhauThuat}>
									<div className={CoverStyles.coverImage}></div>
									<h3 className={CoverStyles.coverName}>
										<FormattedMessage id="cover.link.surgery-pack" />
									</h3>
								</div>
								<div className={CoverStyles.coverLink} id={CoverStyles.sanPhamYTe}>
									<div className={CoverStyles.coverImage}></div>
									<h3 className={CoverStyles.coverName}>
										<FormattedMessage id="cover.link.medical-products" />
									</h3>
								</div>
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
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Cover));
