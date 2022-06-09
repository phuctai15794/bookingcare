import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { HtmlRaw, Functions } from '../../../utils';
import * as actions from '../../../store/actions';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorProfile from '../Doctor/DoctorProfile';
import MainStyles from '../../../styles/Main.module.scss';
import SpecialtyDetailStyles from './SpecialtyDetail.module.scss';

class SpecialtyDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			specialtyDetail: null,
			doctorIds: [2, 4, 6, 8, 9],
			isShowInfo: false,
		};
	}

	handleShowHideInfo = () => {
		this.setState({
			isShowInfo: !this.state.isShowInfo,
		});
	};

	async componentDidMount() {
		const { match, getDetailSpecialty } = this.props;
		const doctorId = match.params.id;
		await getDetailSpecialty(doctorId);
	}

	componentDidUpdate(prevProps) {
		const { specialtyDetail } = this.props;

		if (prevProps.specialtyDetail !== specialtyDetail) {
			this.setState({
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
						{doctorIds && (
							<div className={SpecialtyDetailStyles.specialtyDetailDoctorList}>
								<div className={`${MainStyles.blockContent} ${SpecialtyDetailStyles.blockContent}`}>
									{doctorIds.map((doctor) => {
										return (
											<div
												className={SpecialtyDetailStyles.specialtyDetailDoctorItem}
												key={doctor}
											>
												<div className="row">
													<div className="col-6">
														<div
															className={
																SpecialtyDetailStyles.doctorDetailScheduleBooking
															}
														>
															<DoctorProfile doctorId={doctor} />
														</div>
													</div>
													<div className="col-6">
														<div
															className={
																SpecialtyDetailStyles.doctorDetailScheduleInformation
															}
														>
															<DoctorSchedule doctorId={doctor} />
														</div>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						)}
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
		getDetailSpecialty: (id) => dispatch(actions.getDetailSpecialty(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SpecialtyDetail));
