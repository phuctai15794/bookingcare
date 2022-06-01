import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'swiper';
import Cover from '../Layouts/Cover/Cover';
import Specialty from '../Section/Specialty';
import HealthFacility from '../Section/HealthFacility';
import DoctorInWeek from '../Section/DoctorInWeek';
import Handbook from '../Section/Handbook';
import Communication from '../Section/Communication';
import SectionStyles from '../Section/Section.module.scss';

class Home extends Component {
	render() {
		const swiperSettings = {
			slidesPerView: 4,
			spaceBetween: 10,
			// loop: true,
			navigation: true,
			modules: [Navigation],
			className: 'swiper-section swiper-custom-button',
		};

		return (
			<>
				<Cover />
				<div className={SectionStyles.section}>
					<Specialty settings={swiperSettings} />
					<HealthFacility settings={swiperSettings} />
					<DoctorInWeek settings={swiperSettings} />
					<Handbook settings={{ ...swiperSettings, slidesPerView: 2 }} />
					<Communication />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
