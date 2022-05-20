import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MainStyles from '../../../styles/Main.module.scss';
import SectionStyles from './Section.module.scss';
import HandbookImage from '../../../assets/images/handbook/handbook.jpg';

class Handbook extends Component {
	render() {
		const { settings } = this.props;

		return (
			<>
				<div className={SectionStyles.sectionBlock}>
					<div className={`${MainStyles.blockContent} ${SectionStyles.blockContent}`}>
						<div className={SectionStyles.sectionTitle}>
							<span>
								<FormattedMessage id="section.handbook" />
							</span>
							<strong>
								<FormattedMessage id="app.view-more" />
							</strong>
						</div>
						<div className={SectionStyles.sectionSlider}>
							<Swiper {...settings}>
								<SwiperSlide>
									<div className={SectionStyles.sectionItemFloat}>
										<img
											src={HandbookImage}
											alt="So sánh máy đo đường huyết Accu-chek Guide vs Accu-chek Instant"
										/>
										<h3>So sánh máy đo đường huyết Accu-chek Guide vs Accu-chek Instant</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItemFloat}>
										<img
											src={HandbookImage}
											alt="Máy đo đường huyết Accu-Chek Guide có tốt không? Có điểm gì nổi bật?"
										/>
										<h3>Máy đo đường huyết Accu-Chek Guide có tốt không? Có điểm gì nổi bật?</h3>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={SectionStyles.sectionItemFloat}>
										<img
											src={HandbookImage}
											alt="Máy thử đường huyết Accu-Chek Instant chính hãng giá tốt"
										/>
										<h3>Máy thử đường huyết Accu-Chek Instant chính hãng giá tốt</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
