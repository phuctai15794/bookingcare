import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { HtmlRaw, Functions } from '../../../utils';
import * as actions from '../../../store/actions';
import MainStyles from '../../../styles/Main.module.scss';
import DoctorSchedule from './DoctorSchedule';
import DoctorDetailStyles from './DoctorDetail.module.scss';

class DoctorDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doctorDetail: null,
		};
	}

	async componentDidMount() {
		const { match, getDetailDoctor } = this.props;
		const doctorId = match.params.id;
		await getDetailDoctor(doctorId);
	}

	componentDidUpdate(prevProps) {
		const { doctorDetail } = this.props;

		if (prevProps.doctorDetail !== doctorDetail) {
			this.setState({
				doctorDetail,
			});
		}
	}

	render() {
		const { doctorDetail } = this.state;
		const { language } = this.props;
		const keyLang = `${language[0].toUpperCase()}${language.slice(1)}`;
		const avatar = doctorDetail && doctorDetail.image && Functions.bufferToBase64(doctorDetail.image);
		const title =
			doctorDetail &&
			`${doctorDetail.positionData[`value${keyLang}`]}, ${doctorDetail.firstName} ${doctorDetail.lastName}`;

		return (
			<>
				{doctorDetail ? (
					<>
						<div className={DoctorDetailStyles.doctorDetail}>
							<div className={DoctorDetailStyles.doctorDetailTop}>
								<div className={`${MainStyles.blockContent} ${DoctorDetailStyles.blockContent}`}>
									<div className={DoctorDetailStyles.doctorDetailInformation}>
										<div className={DoctorDetailStyles.doctorDetailAvatar}>
											<img
												onError={({ target }) => Functions.errorImage(target)}
												src={avatar}
												alt={title}
											/>
										</div>
										<div className={DoctorDetailStyles.doctorDetailIntroduce}>
											<h3 className={DoctorDetailStyles.doctorDetailName}>{`${title}`}</h3>
											<div className={DoctorDetailStyles.doctorDetailDescription}>
												{doctorDetail.markdownData.description}
											</div>
										</div>
									</div>
									<div className={DoctorDetailStyles.doctorDetailSchedule}>
										<div className="row">
											<div className="col-6">
												<div className={DoctorDetailStyles.doctorDetailScheduleBooking}>
													<DoctorSchedule doctorId={doctorDetail.id} />
												</div>
											</div>
											<div className="col-6">
												<div
													className={DoctorDetailStyles.doctorDetailScheduleInformation}
												></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={DoctorDetailStyles.doctorDetailContent}>
								<div className={`${MainStyles.blockContent} ${DoctorDetailStyles.blockContent}`}>
									<HtmlRaw>{doctorDetail.markdownData.contentHTML}</HtmlRaw>
								</div>
							</div>
						</div>
					</>
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
		doctorDetail: state.doctor.doctorDetail,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDetailDoctor: (id) => dispatch(actions.getDetailDoctor(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DoctorDetail));
