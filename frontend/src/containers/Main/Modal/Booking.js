import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { toast } from 'react-toastify';
import subDays from 'date-fns/subDays';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as actions from '../../../store/actions';
import { Emitter, HtmlRaw, Functions, Constants } from '../../../utils';
import DoctorProfile from '../Doctor/DoctorProfile';
import MainStyles from '../../../styles/Main.module.scss';

class Booking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attributes: {
				firstName: '',
				lastName: '',
				phone: '',
				email: '',
				address: '',
				medicalReason: '',
				gender: '',
				clinicDate: new Date(),
			},
			dataGender: [],
			message: {
				text: '',
				type: '',
			},
		};
	}

	listenToEmitter = () => {
		Emitter.on('CLEAR_DATA_MODAL_BOOKING', () => {
			this.setState({
				attributes: {
					firstName: '',
					lastName: '',
					phone: '',
					email: '',
					address: '',
					medicalReason: '',
					gender: '',
					clinicDate: new Date(),
				},
			});
		});
	};

	handleShowHideInfo = () => {
		this.setState({
			isShowInfo: !this.state.isShowInfo,
		});
	};

	handleOnChangeDate = (date) => {
		const dateSelected = Functions.formatDate(date, '', 'startOfDay');

		this.setState({
			attributes: {
				...this.state.attributes,
				clinicDate: dateSelected,
			},
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleChangeInput = (event, input) => {
		this.setState({
			attributes: {
				...this.state.attributes,
				[input]: event.target.value,
			},
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleEnterInput = async (event) => {
		if (event.which === 13) {
			await this.handleBooking();
		}
	};

	handleValidateInput = () => {
		let message = {
			type: '',
			text: '',
		};
		let inputs = Object.keys(this.state.attributes);

		for (let index = 0; index < inputs.length; index++) {
			if (!this.state.attributes[inputs[index]]) {
				message.type = inputs[index];
				message.text = `${inputs[index][0].toUpperCase()}${inputs[index].slice(1)} is missing`;
				break;
			}
		}

		return message;
	};

	buildTimeBooking = () => {
		const { language, timeBooking } = this.props;
		const keyLang = Functions.toCapitalizeCase(language);
		return (
			timeBooking &&
			`${timeBooking.timeData[`value${keyLang}`]}, ${Functions.formatDate(
				timeBooking.date,
				Constants.DATE_FORMAT.DAY_OF_WEEK,
				'dayOfWeek',
				language,
			)}`
		);
	};

	buildPriceMedical = () => {
		const { language, timeBooking } = this.props;
		const keyLang = Functions.toCapitalizeCase(language);
		return timeBooking && Functions.formatPrice(timeBooking.infoData.priceData[`value${keyLang}`], language);
	};

	buildDoctorName = () => {
		const { language, timeBooking } = this.props;
		const keyLang = Functions.toCapitalizeCase(language);
		return (
			timeBooking &&
			`${timeBooking.userData.positionData[`value${keyLang}`]}, ${timeBooking.userData.firstName} ${
				timeBooking.userData.lastName
			}`
		);
	};

	handleBooking = async () => {
		const message = this.handleValidateInput();

		if (message.text) {
			document.getElementById(`${message.type}`).focus();
			toast.error(message.text);
		} else {
			const { language, doctorId, timeBooking, bookingPatient } = this.props;
			const { attributes } = this.state;
			const priceMedical = this.buildPriceMedical();
			const timeString = this.buildTimeBooking();
			const doctorName = this.buildDoctorName();
			const dataBooking = {
				...attributes,
				date: Functions.formatDate(attributes.clinicDate, '', 'startOfDay'),
				timeType: timeBooking.timeType,
				timeString,
				priceMedical: priceMedical ?? 'Trả sau',
				doctorName,
				doctorId,
				language,
			};

			await bookingPatient(dataBooking);

			const messageBookingPatient = this.props.messageBookingPatient;

			if (messageBookingPatient) {
				if (messageBookingPatient.type === 'success') {
					Emitter.emit('CLOSE_MODAL_BOOKING');
					toast.success(<HtmlRaw>{`${messageBookingPatient.text}`}</HtmlRaw>);
				} else if (messageBookingPatient.type === 'info') {
					toast.info(<HtmlRaw>{`${messageBookingPatient.text}`}</HtmlRaw>);
				} else if (messageBookingPatient.type === 'error') {
					toast.error(<HtmlRaw>{`${messageBookingPatient.text}`}</HtmlRaw>);
				}
			}
		}
	};

	async componentDidMount() {
		const { fetchAllCode } = this.props;
		await fetchAllCode('GENDER');
		const { genders } = this.props;

		this.listenToEmitter();

		if (genders) {
			this.setState({
				dataGender: genders,
			});
		}
	}

	render() {
		const { intl, language, isOpenModal, doctorId, timeBooking, handleCloseModal } = this.props;
		const { dataGender } = this.state;
		const { firstName, lastName, phone, email, address, medicalReason, gender, clinicDate } = this.state.attributes;
		const keyLang = Functions.toCapitalizeCase(language);
		const priceMedical = this.buildPriceMedical();
		const timeString = this.buildTimeBooking();
		const optionsDefaultLang = {
			gender: intl.formatMessage({ id: 'form.attributes.gender.optionDefault' }),
		};

		return (
			<>
				<Modal
					className={MainStyles.modalMain}
					size="lg"
					isOpen={isOpenModal}
					centered={true}
					keyboard={true}
					backdrop={true}
				>
					<div className={MainStyles.modalMainHeader}>
						<strong>
							<FormattedMessage id="app.schedule-booking" />
						</strong>
						<button className="btn-close" type="button" onClick={handleCloseModal}></button>
					</div>
					<div className={MainStyles.modalMainBody}>
						{doctorId && <DoctorProfile doctorId={doctorId} />}
						{timeBooking && (
							<div className="alert alert-info mb-3">{`${priceMedical ?? 'Trả sau'} (${
								timeString ?? ''
							})`}</div>
						)}
						<form action="#" method="POST" onSubmit={(event) => event.preventDefault()}>
							<div className="row">
								<div className="col-6 mb-3">
									<label className="fw-bold mb-1" htmlFor="firstName">
										<FormattedMessage id="form.attributes.firstName" />:
									</label>
									<input
										type="text"
										className="form-control"
										id="firstName"
										name="firstName"
										required
										value={firstName}
										onChange={(event) => this.handleChangeInput(event, 'firstName')}
										onKeyPress={(event) => this.handleEnterInput(event)}
									/>
								</div>
								<div className="col-6 mb-3">
									<label className="fw-bold mb-1" htmlFor="lastName">
										<FormattedMessage id="form.attributes.lastName" />:
									</label>
									<input
										type="text"
										className="form-control"
										id="lastName"
										name="lastName"
										required
										value={lastName}
										onChange={(event) => this.handleChangeInput(event, 'lastName')}
										onKeyPress={(event) => this.handleEnterInput(event)}
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
										onChange={(event) => this.handleChangeInput(event, 'phone')}
										onKeyPress={(event) => this.handleEnterInput(event)}
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
										onChange={(event) => this.handleChangeInput(event, 'email')}
										onKeyPress={(event) => this.handleEnterInput(event)}
									/>
								</div>
								<div className="col-6 mb-3">
									<label className="fw-bold mb-1">
										<FormattedMessage id="form.attributes.clinicDate" />:
									</label>
									<DatePicker
										className="form-control"
										selected={clinicDate}
										// maxDate={subDays(new Date(), 0)}
										minDate={subDays(new Date(), 0)}
										disabledKeyboardNavigation
										closeOnScroll={true}
										onChange={(date) => this.handleOnChangeDate(date)}
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
										onChange={(event) => this.handleChangeInput(event, 'address')}
										onKeyPress={(event) => this.handleEnterInput(event)}
									/>
								</div>
								<div className="col-6 mb-3">
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
										onChange={(event) => this.handleChangeInput(event, 'medicalReason')}
										onKeyPress={(event) => this.handleEnterInput(event)}
									/>
								</div>
								<div className="col-6">
									<label className="fw-bold mb-1" htmlFor="gender">
										<FormattedMessage id="form.attributes.gender.title" />:
									</label>
									<select
										className="form-select"
										id="gender"
										name="gender"
										required
										value={gender}
										onChange={(event) => this.handleChangeInput(event, 'gender')}
									>
										<option value="">{optionsDefaultLang.gender}</option>
										{!_.isEmpty(dataGender)
											? dataGender.map((gender) => {
													return (
														<option key={gender.id} value={gender.keyMap}>
															{gender[`value${keyLang}`]}
														</option>
													);
											  })
											: ''}
									</select>
								</div>
							</div>
						</form>
					</div>
					<div className={MainStyles.modalMainFooter}>
						<button className="btn btn-sm btn-primary px-3 py-2 me-2" onClick={() => this.handleBooking()}>
							<FormattedMessage id="form.actions.booking" />
						</button>
						<button className="btn btn-sm btn-secondary px-3 py-2" onClick={handleCloseModal}>
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
		messageBookingPatient: state.patient.actions.booking.message,
		genders: state.allCode.genders.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllCode: (type) => dispatch(actions.fetchAllCode(type)),
		bookingPatient: (data) => dispatch(actions.bookingPatient(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Booking));
