import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { Constants, Functions, HtmlRaw } from '../../../utils';
import MainStyles from '../../../styles/Main.module.scss';
import DoctorProfileStyles from './DoctorProfile.module.scss';

class DoctorProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doctorProfile: null,
		};
	}

	async componentDidMount() {
		const { doctorId, getProfileDoctor } = this.props;

		await getProfileDoctor(doctorId);

		if (this.props.doctorProfile) {
			this.setState({
				doctorProfile: this.props.doctorProfile,
			});
		}
	}

	render() {
		const { language, doctorId, isSmallTitle, isViewDetail } = this.props;
		const { doctorProfile } = this.state;
		const keyLang = Functions.toCapitalizeCase(language);
		const avatar = doctorProfile && doctorProfile.image && Functions.bufferToBase64(doctorProfile.image);
		const title =
			doctorProfile &&
			`${doctorProfile.positionData[`value${keyLang}`]}, ${doctorProfile.firstName} ${doctorProfile.lastName}`;
		const description =
			(doctorProfile && doctorProfile.markdownData && doctorProfile.markdownData.description) || '';

		return (
			<>
				{doctorProfile ? (
					<>
						<div className={DoctorProfileStyles.doctorProfileInformation}>
							<div className={DoctorProfileStyles.doctorProfileAvatar}>
								<img onError={({ target }) => Functions.errorImage(target)} src={avatar} alt={title} />
							</div>
							<div className={DoctorProfileStyles.doctorProfileIntroduce}>
								<h3
									className={`${DoctorProfileStyles.doctorProfileName} ${
										isSmallTitle && DoctorProfileStyles.isSmallTitle
									}`}
								>{`${title}`}</h3>
								<div className={DoctorProfileStyles.doctorProfileDescription}>
									{<HtmlRaw isPreWrap>{description}</HtmlRaw>}
								</div>
								{isViewDetail && (
									<Link
										className={`${MainStyles.viewMore} d-inline-block align-top pt-2`}
										to={`${Constants.PATHS.MAIN.DOCTOR_DETAIL}/${doctorId}`}
									>
										<FormattedMessage id="app.view-more" />
									</Link>
								)}
							</div>
						</div>
					</>
				) : (
					''
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		doctorProfile: state.doctor.doctorProfile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProfileDoctor: (id) => dispatch(actions.getProfileDoctor(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
