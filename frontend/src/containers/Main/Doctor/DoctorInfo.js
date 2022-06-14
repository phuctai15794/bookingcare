import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { Functions } from '../../../utils';
import MainStyles from '../../../styles/Main.module.scss';
import DoctorInfoStyles from './DoctorInfo.module.scss';

class DoctorInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			doctorInfo: null,
			isShowInfo: false,
		};
	}

	handleShowHideInfo = () => {
		this.setState({
			isShowInfo: !this.state.isShowInfo,
		});
	};

	async componentDidMount() {
		const { doctorId, getInfoDoctor } = this.props;
		await getInfoDoctor(doctorId);
		const { doctorInfo } = this.props;

		if (doctorInfo) {
			this.setState({
				doctorInfo: doctorInfo.infoData,
			});
		}
	}

	render() {
		const { isShowInfo, doctorInfo } = this.state;
		const { language } = this.props;
		const keyLang = Functions.toCapitalizeCase(language);
		const priceMedical = doctorInfo && Functions.formatPrice(doctorInfo.priceData[`value${keyLang}`], language);

		return (
			<>
				{doctorInfo && doctorInfo.nameClinic && doctorInfo.addressClinic && (
					<div className={DoctorInfoStyles.doctorInfo}>
						<div className={DoctorInfoStyles.doctorInfoTitle}>
							<strong>
								<FormattedMessage id="app.medical-address" />:
							</strong>
						</div>
						<div className={DoctorInfoStyles.doctorInfoNameClinic}>{doctorInfo.nameClinic ?? ''}</div>
						<div className={DoctorInfoStyles.doctorInfoAddressClinic}>{doctorInfo.addressClinic ?? ''}</div>
						<hr className={DoctorInfoStyles.doctorInfoHr} />
						{priceMedical && (
							<>
								<div className={DoctorInfoStyles.doctorInfoTitle}>
									<strong>
										<FormattedMessage id="app.medical-price" />:
									</strong>
									{!isShowInfo && <span>{priceMedical}</span>}
								</div>
								{isShowInfo && (
									<div className={`${MainStyles.boxInfo} mb-3`}>
										<div className={MainStyles.boxInfoTitle}>
											<span>
												<FormattedMessage id="app.medical-price" />
											</span>
											<span>{priceMedical}</span>
											{doctorInfo.note && (
												<p className={MainStyles.boxInfoNote}>{doctorInfo.note ?? ''}</p>
											)}
										</div>
										<div className={MainStyles.boxInfoContent}>
											<FormattedMessage id="app.medical-payment" />
											{': '}
											<strong>{doctorInfo.paymentData[`value${keyLang}`]}</strong>
										</div>
									</div>
								)}
								<span className={MainStyles.viewMore} onClick={() => this.handleShowHideInfo()}>
									{isShowInfo ? (
										<FormattedMessage id="app.hide-content" />
									) : (
										<FormattedMessage id="app.view-detail" />
									)}
								</span>
							</>
						)}
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		doctorInfo: state.doctor.doctorInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getInfoDoctor: (id) => dispatch(actions.getInfoDoctor(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);
