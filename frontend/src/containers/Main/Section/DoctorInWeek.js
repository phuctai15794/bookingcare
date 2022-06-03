import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Constants, Functions } from '../../../utils';
import * as actions from '../../../store/actions';
import MainStyles from '../../../styles/Main.module.scss';
import SectionStyles from './Section.module.scss';

class DoctorInWeek extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doctorsInWeek: [],
		};
	}

	async componentDidMount() {
		const { fetchDoctorsInWeek } = this.props;
		await fetchDoctorsInWeek();
	}

	componentDidUpdate(prevProps) {
		const { doctorsInWeek } = this.props;

		if (prevProps.doctorsInWeek !== doctorsInWeek) {
			this.setState({
				doctorsInWeek,
			});
		}
	}

	render() {
		const { doctorsInWeek } = this.state;
		const { language, settings, loadingFetchDoctorsInWeek } = this.props;
		const keyLang = Functions.toCapitalizCase(language);

		return (
			<>
				<div className={SectionStyles.sectionBlock}>
					<div className={`${MainStyles.blockContent} ${SectionStyles.blockContent}`}>
						<div className={SectionStyles.sectionTitle}>
							<span>
								<FormattedMessage id="section.doctor-in-week" />
							</span>
							<strong>
								<FormattedMessage id="app.view-more" />
							</strong>
						</div>
						<div className={SectionStyles.sectionSlider}>
							{loadingFetchDoctorsInWeek ? (
								<div className="alert alert-info">Loading data ...</div>
							) : doctorsInWeek && doctorsInWeek.length ? (
								<Swiper {...settings}>
									{doctorsInWeek.map((doctor) => {
										let avatar = Functions.bufferToBase64(doctor.image);
										let title = `${doctor.positionData[`value${keyLang}`]}, ${doctor.firstName} ${
											doctor.lastName
										}`;

										return (
											<SwiperSlide key={doctor.id}>
												<div className={SectionStyles.sectionItemBorder}>
													<Link
														to={`${Constants.PATHS.MAIN.DOCTOR_DETAIL}/${doctor.id}`}
														title={title}
													>
														<img
															onError={({ target }) => Functions.errorImage(target)}
															src={avatar}
															alt={title}
														/>
													</Link>
													<h3>
														<Link
															to={`${Constants.PATHS.MAIN.DOCTOR_DETAIL}/${doctor.id}`}
															title={title}
														>
															{title}
														</Link>
													</h3>
													<span>Sức khỏe tâm thần</span>
												</div>
											</SwiperSlide>
										);
									})}
								</Swiper>
							) : (
								<div className="alert alert-warning">
									<FormattedMessage id="app.no-results-found" />
								</div>
							)}
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
		loadingFetchDoctorsInWeek: state.doctor.loading,
		doctorsInWeek: state.doctor.doctorsInWeek,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDoctorsInWeek: () => dispatch(actions.fetchDoctorsInWeek()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInWeek);
