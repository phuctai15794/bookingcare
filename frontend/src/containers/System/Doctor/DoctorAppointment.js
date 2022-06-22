import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
// import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faFileInvoice, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Emitter, Constants, Functions, LocalStorage } from '../../../utils';
import * as actions from '../../../store/actions';
import Remedy from '../Modal/Remedy';
import SystemStyles from '../../../styles/System.module.scss';

class DoctorAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenModal: false,
			dataConfirm: null,
			appointments: [],
			currentDate: new Date(),
			hasFilter: false,
			message: {
				text: '',
				type: '',
			},
		};
	}

	listenToEmitter = () => {
		Emitter.on('CLOSE_MODAL_REMEDY', () => {
			this.setState({
				isOpenModal: false,
			});
		});
		Emitter.on('FETCH_APPOINTMENT', async (data) => {
			const { fetchAppointments } = this.props;
			await fetchAppointments(data.doctorId, data.date);
		});
	};

	handleCancelFilter = async () => {
		const { history, fetchAppointments } = this.props;
		const date = 0;
		const userInfo = LocalStorage.get('userInfo');

		history.replace({
			pathname: `${Constants.PATHS.SYSTEM.HOME}/doctor/appointment-manage`,
		});

		this.setState({
			hasFilter: false,
		});

		await fetchAppointments(userInfo.id, date);
	};

	handleChangeDate = async (selectedDated) => {
		const { history, fetchAppointments } = this.props;
		const date = Functions.formatDate(selectedDated, '', 'startOfDay');
		const userInfo = LocalStorage.get('userInfo');

		history.replace({
			pathname: `${Constants.PATHS.SYSTEM.HOME}/doctor/appointment-manage/?date=${date}`,
		});

		this.setState({
			hasFilter: true,
			currentDate: selectedDated,
		});

		await fetchAppointments(userInfo.id, date);
	};

	handleSend = async (dataConfirm) => {
		const { sendRemedy } = this.props;
		const data = {
			doctorId: dataConfirm.doctorId,
			patientId: dataConfirm.patientId,
			timeType: dataConfirm.timeType,
			email: dataConfirm.email,
			fileAttach: dataConfirm.fileAttach,
		};

		await sendRemedy(data);
	};

	handleCloseModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};

	handleConfirm = (item) => {
		const data = {
			doctorId: item.doctorId,
			patientId: item.patientId,
			timeType: item.timeType,
			email: item.patientData.email,
		};

		this.setState({
			isOpenModal: true,
			dataConfirm: data,
		});
	};

	async componentDidMount() {
		const { location, fetchAppointments } = this.props;
		const userInfo = LocalStorage.get('userInfo');
		const queryParams = new URLSearchParams(location.search);
		const date = queryParams.get('date') || 0;

		this.listenToEmitter();

		if (date) {
			this.setState({
				hasFilter: true,
			});
		}

		await fetchAppointments(userInfo.id, date);
	}

	componentDidUpdate(prevProps) {
		const { appointments } = this.props;

		if (prevProps.appointments !== appointments) {
			this.setState({
				appointments,
			});
		}
	}

	render() {
		const { appointments, isOpenModal, dataConfirm, currentDate, hasFilter, message } = this.state;
		const { language } = this.props;
		const keyLang = Functions.toCapitalizeCase(language);

		return (
			<>
				<div className={SystemStyles.titleMain}>
					<FormattedMessage id="menu.doctor.appointment-management.types.appointment" />
				</div>
				<div className={SystemStyles.contentMain}>
					{message.type !== '' ? (
						<div className={`alert alert-${message.type === 'error' ? 'danger' : message.type}`}>
							{message.text}
						</div>
					) : (
						''
					)}
					<form action="#" method="POST" onSubmit={(event) => event.preventDefault()}>
						<div className="row mb-3">
							<div className="col-4 mb-3">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-date" />:
								</label>
								<DatePicker
									className="form-control"
									selected={currentDate}
									disabledKeyboardNavigation
									closeOnScroll={true}
									onChange={(date) => this.handleChangeDate(date)}
								/>
							</div>
							{hasFilter && (
								<div className="col-12 mb-2">
									<button
										type="button"
										className="btn btn-sm btn-danger text-light px-3 py-2"
										onClick={() => this.handleCancelFilter()}
									>
										<i>
											<FontAwesomeIcon className="me-2" icon={faTimesCircle} />
										</i>
										<FormattedMessage id="form.actions.cancelFilter" />
									</button>
								</div>
							)}
							{!_.isEmpty(appointments) && (
								<div className="col-12">
									<table className="table table-bordered">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">
													<FormattedMessage id="form.attributes.time" />
												</th>
												<th scope="col">
													<FormattedMessage id="form.attributes.fullName" />
												</th>
												<th scope="col">
													<FormattedMessage id="form.attributes.address" />
												</th>
												<th scope="col">
													<FormattedMessage id="form.attributes.gender.title" />
												</th>
												<th scope="col">
													<FormattedMessage id="form.attributes.statusAppointment" />
												</th>
												<th scope="col" className="text-center">
													<FormattedMessage id="form.actions.action" />
												</th>
											</tr>
										</thead>
										<tbody>
											{appointments.map((item, index) => {
												return (
													<tr key={item.id}>
														<th scope="row">{index + 1}</th>
														<td>{item.timeBookingData[`value${keyLang}`]}</td>
														<td>{`${item.patientData.firstName} ${item.patientData.lastName}`}</td>
														<td>{item.patientData.address}</td>
														<td>{item.patientData.genderData[`value${keyLang}`]}</td>
														<td>{item.statusData[`value${keyLang}`]}</td>
														<td className="text-center">
															<button
																type="button"
																className="btn btn-sm btn-warning me-3 px-3 py-2"
																onClick={() => this.handleConfirm(item)}
															>
																<i>
																	<FontAwesomeIcon
																		className="me-2"
																		icon={faCircleCheck}
																	/>
																</i>
																<FormattedMessage id="form.actions.confirm" />
															</button>
															<button
																type="button"
																className="btn btn-sm btn-info text-light px-3 py-2"
															>
																<i>
																	<FontAwesomeIcon
																		className="me-2"
																		icon={faFileInvoice}
																	/>
																</i>
																<FormattedMessage id="form.actions.invoice" />
															</button>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</form>
				</div>
				<Remedy
					isOpenModal={isOpenModal}
					dataConfirm={dataConfirm}
					handleSend={this.handleSend}
					handleCloseModal={this.handleCloseModal}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		appointments: state.doctor.appointments,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAppointments: (id, date) => dispatch(actions.fetchAppointments(id, date)),
		sendRemedy: (data) => dispatch(actions.sendRemedy(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DoctorAppointment));
