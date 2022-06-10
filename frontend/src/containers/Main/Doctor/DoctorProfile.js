import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Functions } from '../../../utils';
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
		const { language } = this.props;
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
								<h3 className={DoctorProfileStyles.doctorProfileName}>{`${title}`}</h3>
								<div className={DoctorProfileStyles.doctorProfileDescription}>{description}</div>
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
