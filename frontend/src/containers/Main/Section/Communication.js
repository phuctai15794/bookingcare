import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import MainStyles from '../../../styles/Main.module.scss';
import SectionStyles from './Section.module.scss';
import CommunicationStyles from './Communication.module.scss';
import BreakingNewsImage from '../../../assets/images/breaking-news.jpg';

class Communication extends Component {
	render() {
		return (
			<>
				<div className={SectionStyles.sectionBlock}>
					<div className={`${MainStyles.blockContent} ${SectionStyles.blockContent}`}>
						<div className={SectionStyles.sectionTitle}>
							<span>
								<FormattedMessage id="section.communication" />
							</span>
						</div>
						<div className={SectionStyles.sectionContent}>
							<div className="row justify-content-between">
								<div className="col-7">
									<div className={MainStyles.videoIframe} id={CommunicationStyles.videoCommunication}>
										<iframe
											width="100%"
											height="100%"
											src="https://www.youtube.com/embed/eTD0WWFIDAg"
											title="YouTube video player"
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
										></iframe>
									</div>
								</div>
								<div className="col-5">
									<img src={BreakingNewsImage} alt="Breaking news" />
								</div>
							</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Communication);
