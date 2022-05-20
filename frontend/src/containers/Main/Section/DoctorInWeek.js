import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { PATHS, Functions } from '../../../utils';
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
		const keyLang = `${language[0].toUpperCase()}${language.slice(1)}`;

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
							) : doctorsInWeek.length ? (
								<Swiper {...settings}>
									{doctorsInWeek.map((doctor) => {
										const avatar = Functions.bufferToBase64(doctor.image);
										const title = `${doctor.positionData[`value${keyLang}`]}, ${doctor.firstName} ${
											doctor.lastName
										}`;

										return (
											<SwiperSlide key={doctor.id}>
												<div className={SectionStyles.sectionItemBorder}>
													<Link to={`${PATHS.MAIN.DOCTOR_DETAIL}/${doctor.id}`} title={title}>
														<img
															onError={({ target }) => Functions.errorImage(target)}
															src={avatar}
															alt={title}
														/>
													</Link>
													<h3>
														<Link
															to={`${PATHS.MAIN.DOCTOR_DETAIL}/${doctor.id}`}
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
								<div className="alert alert-warning">No results found ...</div>
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
		isLoggedIn: state.user.isLoggedIn,
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
