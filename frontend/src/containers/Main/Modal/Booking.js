import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import { Functions } from '../../../utils';
import MainStyles from '../../../styles/Main.module.scss';
import DoctorDetailStyles from '../Doctor/DoctorDetail.module.scss';

class Booking extends Component {
	constructor(props) {
		super(props);
		this.resetFile = React.createRef();
		this.state = {
			fullName: '',
			phone: '',
			email: '',
			address: '',
			medicalReason: '',
			bookFor: '',
			gender: '',
			message: {
				text: '',
				type: '',
			},
		};
	}

	handleShowHideInfo = () => {
		this.setState({
			isShowInfo: !this.state.isShowInfo,
		});
	};

	handleOnChangeInput = (event, type) => {};

	render() {
		const { language, isOpenBooking, infoBooking } = this.props;
		const { onCloseBooking } = this.props;
		const { fullName, phone, email, address, medicalReason, bookFor, gender } = this.state;
		const keyLang = Functions.toCapitalizCase(language);
		const priceMedical = infoBooking && Functions.formatPrice(infoBooking.priceData[`value${keyLang}`], language);

		return (
			<>
				<Modal
					className={MainStyles.modalMain}
					size="lg"
					isOpen={isOpenBooking}
					centered={true}
					keyboard={true}
					backdrop={true}
				>
					<div className={MainStyles.modalMainHeader}>
						<strong>
							<FormattedMessage id="app.schedule-booking" />
						</strong>
						<button className="btn-close" type="button" onClick={onCloseBooking}></button>
					</div>
					<div className={MainStyles.modalMainBody}>
						<div className="alert alert-info d-inline-block w-auto">
							<FormattedMessage id="app.medical-price" />: <strong>{priceMedical}</strong>
						</div>
						<form action="#" method="POST" onSubmit={(event) => event.preventDefault()}>
							<div className="row">
								<div className="col-6 mb-3">
									<label className="fw-bold mb-1" htmlFor="fullName">
										<FormattedMessage id="form.attributes.fullName" />:
									</label>
									<input
										type="text"
										className="form-control"
										id="fullName"
										name="fullName"
										required
										value={fullName}
										onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
									/>
								</div>
								<div className="col-6 mb-3">
									<label className="fw-bold mb-1" htmlFor="phone">
										<FormattedMessage id="form.attributes.phone" />:
									</label>
									<input
										type="text"
										className="form-control"
										id="phone"
										name="phone"
										required
										value={phone}
										onChange={(event) => this.handleOnChangeInput(event, 'phone')}
									/>
								</div>
								<div className="col-6 mb-3">
									<label className="fw-bold mb-1" htmlFor="email">
										<FormattedMessage id="form.attributes.email" />:
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										name="email"
										required
										value={email}
										onChange={(event) => this.handleOnChangeInput(event, 'email')}
									/>
								</div>
								<div className="col-6 mb-3">
									<label className="fw-bold mb-1" htmlFor="address">
										<FormattedMessage id="form.attributes.address" />:
									</label>
									<input
										type="text"
										className="form-control"
										id="address"
										name="address"
										required
										value={address}
										onChange={(event) => this.handleOnChangeInput(event, 'address')}
									/>
								</div>
								<div className="col-12 mb-3">
									<label className="fw-bold mb-1" htmlFor="medicalReason">
										<FormattedMessage id="form.attributes.medicalReason" />:
									</label>
									<input
										type="text"
										className="form-control"
										id="medicalReason"
										name="medicalReason"
										required
										value={medicalReason}
										onChange={(event) => this.handleOnChangeInput(event, 'medicalReason')}
									/>
								</div>
								<div className="col-6 mb-3">
									<label className="fw-bold mb-1" htmlFor="bookFor">
										<FormattedMessage id="form.attributes.bookFor" />:
									</label>
									<input
										type="text"
										className="form-control"
										id="bookFor"
										name="bookFor"
										required
										value={bookFor}
										onChange={(event) => this.handleOnChangeInput(event, 'bookFor')}
									/>
								</div>
								<div className="col-6 mb-3">
									<label className="fw-bold mb-1" htmlFor="gender">
										<FormattedMessage id="form.attributes.gender.title" />:
									</label>
									<input
										type="text"
										className="form-control"
										id="gender"
										name="gender"
										required
										value={gender}
										onChange={(event) => this.handleOnChangeInput(event, 'gender')}
									/>
								</div>
							</div>
						</form>
					</div>
					<div className={MainStyles.modalMainFooter}>
						<button className="btn btn-sm btn-primary px-3 py-2 me-2">
							<FormattedMessage id="form.actions.booking" />
						</button>
						<button className="btn btn-sm btn-secondary px-3 py-2" onClick={onCloseBooking}>
							<FormattedMessage id="form.actions.cancel" />
						</button>
					</div>
				</Modal>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
