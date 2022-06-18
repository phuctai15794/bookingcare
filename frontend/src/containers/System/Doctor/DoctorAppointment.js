import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
// import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Functions, LocalStorage } from '../../../utils';
import * as actions from '../../../store/actions';
import SystemStyles from '../../../styles/System.module.scss';

class DoctorAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments: [],
			currentDate: new Date(),
			message: {
				text: '',
				type: '',
			},
		};
	}

	handleOnChangeDate = async (selectedDated) => {
		this.setState({
			currentDate: selectedDated,
		});
	};

	async componentDidMount() {
		const { fetchAppointments } = this.props;
		const userInfo = LocalStorage.get('userInfo');
		const date = 0;
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
		const { appointments, currentDate, message } = this.state;
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
									onChange={(date) => this.handleOnChangeDate(date)}
								/>
							</div>
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
														<td className="text-center">
															<button
																type="button"
																className="btn btn-sm btn-warning text-light me-3 px-3 py-2"
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
	return { fetchAppointments: (id, date) => dispatch(actions.fetchAppointments(id, date)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAppointment);
