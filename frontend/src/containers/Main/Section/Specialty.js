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
import SpecialtyStyles from './Specialty.module.scss';

class Specialty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			specialtiesHome: [],
		};
	}

	async componentDidMount() {
		const { fetchSpecialtiesHome } = this.props;
		await fetchSpecialtiesHome();
	}

	componentDidUpdate(prevProps) {
		const { specialtiesHome } = this.props;

		if (prevProps.specialtiesHome !== specialtiesHome) {
			this.setState({
				specialtiesHome,
			});
		}
	}

	render() {
		const { specialtiesHome } = this.state;
		const { settings, loadingFetchSpecialtiesHome } = this.props;

		return (
			<>
				<div className={SectionStyles.sectionBlock}>
					<div className={`${MainStyles.blockContent} ${SectionStyles.blockContent}`}>
						<div className={SectionStyles.sectionTitle}>
							<span>
								<FormattedMessage id="section.specialty" />
							</span>
							<strong>
								<FormattedMessage id="app.view-more" />
							</strong>
						</div>
						<div className={SectionStyles.sectionSlider}>
							{loadingFetchSpecialtiesHome ? (
								<div className="alert alert-info">Loading data ...</div>
							) : specialtiesHome && specialtiesHome.length ? (
								<Swiper {...settings}>
									{specialtiesHome.map((item) => {
										let image = Functions.bufferToBase64(item.image);
										let title = item.name;

										return (
											<SwiperSlide key={item.id}>
												<div
													className={`${SectionStyles.sectionItem} ${SpecialtyStyles.sectionItem}`}
												>
													<Link
														to={`${Constants.PATHS.MAIN.SPECIALTY_DETAIL}/${item.id}`}
														title={title}
													>
														<img
															onError={({ target }) => Functions.errorImage(target)}
															src={image}
															alt={title}
														/>
													</Link>
													<h3>{title}</h3>
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
		specialtiesHome: state.specialty.specialtiesHome,
		loadingFetchSpecialtiesHome: state.specialty.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSpecialtiesHome: () => dispatch(actions.fetchSpecialtiesHome()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
