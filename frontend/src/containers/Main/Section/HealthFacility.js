import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MainStyles from '../../../styles/Main.module.scss';
import SectionStyles from './Section.module.scss';
import HealthFacilityImage from '../../../assets/images/health-facility/health-facility.jpg';

class HealthFacility extends Component {
	render() {
		const { settings } = this.props;

		return (
			<>
				<div className={SectionStyles.sectionBlock}>
					<div className={`${MainStyles.blockContent} ${SectionStyles.blockContent}`}>
						<div className={SectionStyles.sectionTitle}>
							<span>
								<FormattedMessage id="section.health-facility" />
							</span>
							<strong>
								<FormattedMessage id="app.view-more" />
							</strong>
						</div>
						<div className={SectionStyles.sectionSlider}>
							<Swiper {...settings}>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={HealthFacilityImage} alt="Bệnh viện hữu nghị việt đức" />
										<h3>Bệnh viện hữu nghị việt đức</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={HealthFacilityImage} alt="Bệnh viện chợ rẫy" />
										<h3>Bệnh viện chợ rẫy</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={HealthFacilityImage} alt="Bệnh viện K" />
										<h3>Bệnh viện K</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={HealthFacilityImage} alt="Bệnh viện hưng việt" />
										<h3>Bệnh viện hưng việt</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={HealthFacilityImage} alt="Bệnh viện thu cúc" />
										<h3>Bệnh viện thu cúc</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={HealthFacilityImage} alt="Bệnh viện hồng phát" />
										<h3>Bệnh viện hồng phát</h3>
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthFacility);
