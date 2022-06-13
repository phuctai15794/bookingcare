import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { HtmlRaw, Functions } from '../../../utils';
import * as actions from '../../../store/actions';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorProfile from '../Doctor/DoctorProfile';
import DoctorInfo from '../Doctor/DoctorInfo';
import MainStyles from '../../../styles/Main.module.scss';
import SpecialtyDetailStyles from './SpecialtyDetail.module.scss';

class SpecialtyDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			specialtyDetail: null,
			doctorIds: null,
			provinceIds: null,
			isShowInfo: false,
		};
	}

	handleShowHideInfo = () => {
		this.setState({
			isShowInfo: !this.state.isShowInfo,
		});
	};

	buildIds = (ids, type) => {
		return ids.map((id) => id[type]);
	};

	async componentDidMount() {
		const { match, location, getDetailSpecialty } = this.props;
		const doctorId = match.params.id;
		const queryParams = new URLSearchParams(location.search);
		const locationId = queryParams.get('locationId') || 'ALL';
		await getDetailSpecialty(doctorId, locationId);
	}

	componentDidUpdate(prevProps) {
		const { specialtyDetail } = this.props;

		if (prevProps.specialtyDetail !== specialtyDetail) {
			this.setState({
				doctorIds: this.buildIds(specialtyDetail.doctorInfos, 'doctorId'),
				provinceIds: this.buildIds(specialtyDetail.doctorInfos, 'provinceId'),
				specialtyDetail,
			});
		}
	}

	render() {
		const { specialtyDetail, isShowInfo, doctorIds } = this.state;
		const image = specialtyDetail && specialtyDetail.image && Functions.bufferToBase64(specialtyDetail.image);

		return (
			<>
				{specialtyDetail ? (
					<div className={SpecialtyDetailStyles.specialtyDetail}>
						<div
							className={SpecialtyDetailStyles.specialtyDetailInformation}
							style={{ backgroundImage: `url(${image})` }}
						>
							<div className={SpecialtyDetailStyles.specialtyDetailInformationInner}>
								<div className={`${MainStyles.blockContent} ${SpecialtyDetailStyles.blockContent}`}>
									<h3 className={SpecialtyDetailStyles.specialtyDetailTitle}>
										{specialtyDetail.name}
									</h3>
									<div
										className={`${SpecialtyDetailStyles.specialtyDetailContent} ${
											isShowInfo && SpecialtyDetailStyles.active
										}`}
									>
										<HtmlRaw>{specialtyDetail.contentHTML}</HtmlRaw>
									</div>
									<span className={MainStyles.viewMore} onClick={() => this.handleShowHideInfo()}>
										{isShowInfo ? (
											<FormattedMessage id="app.hide-less" />
										) : (
											<FormattedMessage id="app.view-more" />
										)}
									</span>
								</div>
							</div>
						</div>
						<div className={SpecialtyDetailStyles.specialtyDetailDoctorList}>
							<div className={`${MainStyles.blockContent} ${SpecialtyDetailStyles.blockContent}`}>
								{doctorIds && doctorIds.length ? (
									doctorIds.map((doctorId) => {
										return (
											<div
												className={SpecialtyDetailStyles.specialtyDetailDoctorItem}
												key={doctorId}
											>
												<div className="row">
													<div className="col-6">
														<div
															className={
																SpecialtyDetailStyles.doctorDetailScheduleBooking
															}
														>
															<DoctorProfile
																doctorId={doctorId}
																isSmallTitle
																isViewDetail
															/>
														</div>
													</div>
													<div className="col-6">
														<div
															className={
																SpecialtyDetailStyles.doctorDetailScheduleInformation
															}
														>
															<DoctorSchedule doctorId={doctorId} />

															<hr />

															<DoctorInfo doctorId={doctorId} />
														</div>
													</div>
												</div>
											</div>
										);
									})
								) : (
									<div className="alert alert-warning">
										<FormattedMessage id="app.no-results-found" />
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className="alert alert-warning">
						<FormattedMessage id="app.no-results-found" />
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		specialtyDetail: state.specialty.specialtyDetail,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDetailSpecialty: (id, locationId) => dispatch(actions.getDetailSpecialty(id, locationId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SpecialtyDetail));
