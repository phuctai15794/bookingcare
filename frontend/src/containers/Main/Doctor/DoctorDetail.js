import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { HtmlRaw } from '../../../utils';
import * as actions from '../../../store/actions';
import MainStyles from '../../../styles/Main.module.scss';
import DoctorSchedule from './DoctorSchedule';
import DoctorProfile from './DoctorProfile';
import DoctorInfo from './DoctorInfo';
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

		return (
			<>
				{doctorDetail ? (
					<div className={DoctorDetailStyles.doctorDetail}>
						<div className={DoctorDetailStyles.doctorDetailTop}>
							<div className={`${MainStyles.blockContent} ${DoctorDetailStyles.blockContent}`}>
								<DoctorProfile doctorId={doctorDetail.id} />
								<div className={DoctorDetailStyles.doctorDetailSchedule}>
									<div className="row gx-5">
										<div className="col-6">
											<div className={DoctorDetailStyles.doctorDetailScheduleBooking}>
												<DoctorSchedule doctorId={doctorDetail.id} />
											</div>
										</div>
										<div className="col-6">
											<div className={DoctorDetailStyles.doctorDetailScheduleInformation}>
												<DoctorInfo doctorId={doctorDetail.id} />
											</div>
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
