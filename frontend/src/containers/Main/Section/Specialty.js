import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MainStyles from '../../../styles/Main.module.scss';
import SectionStyles from './Section.module.scss';
import SpecialtyImage from '../../../assets/images/specialty/specialty.jpg';

class Specialty extends Component {
	render() {
		const { settings } = this.props;

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
							<Swiper {...settings}>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={SpecialtyImage} alt="Cơ xương khớp" />
										<h3>Cơ xương khớp</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={SpecialtyImage} alt="Thần kinh" />
										<h3>Thần kinh</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={SpecialtyImage} alt="Tiêu hóa" />
										<h3>Tiêu hóa</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={SpecialtyImage} alt="Tim mạch" />
										<h3>Tim mạch</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={SpecialtyImage} alt="Tai mũi họng" />
										<h3>Tai mũi họng</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItem}>
										<img src={SpecialtyImage} alt="Cột sống" />
										<h3>Cột sống</h3>
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
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
