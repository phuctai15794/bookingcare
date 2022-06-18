import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import subDays from 'date-fns/subDays';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Constants, Functions, HtmlRaw } from '../../../utils';
import * as actions from '../../../store/actions';
import SystemStyles from '../../../styles/System.module.scss';

class DoctorSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			times: [],
			currentDate: new Date(),
			maxNumberPatient: '',
			select: {
				list: [],
				selected: null,
			},
			message: {
				text: '',
				type: '',
			},
		};
	}

	handleChangeDoctor = async (selectedOption) => {
		const { getScheduleByDate } = this.props;
		const { currentDate } = this.state;
		const dateSelected = Functions.formatDate(currentDate, '', 'startOfDay');
		await getScheduleByDate(selectedOption.value, dateSelected);

		this.setState({
			select: {
				...this.state.select,
				selected: selectedOption,
			},
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleChangeDate = async (selectedDated) => {
		const { getScheduleByDate } = this.props;
		const { select } = this.state;

		if (select.selected && select.selected.value) {
			const dateSelected = Functions.formatDate(selectedDated, '', 'startOfDay');
			await getScheduleByDate(select.selected.value, dateSelected);
		}

		this.setState({
			currentDate: selectedDated,
		});
	};

	handleChangeNumberPatient = (event) => {
		const maxNumberPatient = event.target.value;

		if (!Functions.isNumber(maxNumberPatient)) {
			toast.error('Number is invalid');
		} else {
			this.setState({
				maxNumberPatient: event.target.value,
			});
		}
	};

	handleSave = async () => {
		const { createSchedule } = this.props;
		const { times, select, currentDate, maxNumberPatient } = this.state;
		const doctorSelected = select.selected;
		const dateSelected = Functions.formatDate(currentDate, '', 'startOfDay');
		const timesSelected = !_.isEmpty(times) && times.filter((time) => time.isActive);
		let result = [];

		if (!doctorSelected) {
			toast.error('Please choose a doctor');
		} else if (!dateSelected || (dateSelected && dateSelected === 'Invalid date')) {
			toast.error('Please choose a date');
		} else if (!maxNumberPatient) {
			toast.error('Please enter a number');
		} else if (_.isEmpty(timesSelected)) {
			toast.error('Please choose a times');
		} else {
			!_.isEmpty(timesSelected) &&
				timesSelected.forEach((timeSelected) => {
					let temp = {};
					temp.doctorId = doctorSelected.value;
					temp.maxNumber = maxNumberPatient;
					temp.date = dateSelected;
					temp.timeType = timeSelected.keyMap;
					result.push(temp);
				});

			await createSchedule(result);
		}
	};

	buildDoctorsSelect = (doctors) => {
		const { language } = this.props;

		return (
			!_.isEmpty(doctors) &&
			doctors.map((doctor) => ({
				value: doctor.id,
				label:
					language === Constants.LANGUAGES.VI
						? `${doctor.firstName} ${doctor.lastName}`
						: language === Constants.LANGUAGES.EN
						? `${doctor.lastName} ${doctor.firstName}`
						: '',
			}))
		);
	};

	handleChooseTime = (timeId) => {
		const { times } = this.state;
		const newTimes =
			!_.isEmpty(times) &&
			times.map((time) => {
				if (time.id === timeId) {
					time.isActive = !time.isActive;
				}
				return time;
			});

		this.setState({
			times: newTimes,
		});
	};

	async componentDidMount() {
		const { fetchDoctors, fetchAllCode } = this.props;
		await fetchDoctors();
		await fetchAllCode('TIME');
	}

	componentDidUpdate(prevProps) {
		const { language, doctors, times, schedulesByDate, loadingSchedule, messageSchedule } = this.props;

		if (prevProps.doctors !== doctors || prevProps.language !== language) {
			const optionsDoctor = this.buildDoctorsSelect(doctors);

			this.setState({
				select: {
					...this.state.select,
					list: optionsDoctor || [],
				},
			});
		}

		if (prevProps.times !== times) {
			const newTimes = !_.isEmpty(times) && times.map((time) => ({ ...time, isActive: false }));

			this.setState({
				times: newTimes,
			});
		}

		if (prevProps.schedulesByDate !== schedulesByDate) {
			const newState = { ...this.state };
			const firstSchedule = !_.isEmpty(schedulesByDate) && schedulesByDate.at(0);
			const newTimesByDate =
				!_.isEmpty(times) &&
				times.map((time) => {
					let isActive =
						!_.isEmpty(schedulesByDate) &&
						schedulesByDate.some((schedule) => schedule.timeType === time.keyMap);
					return { ...time, isActive: isActive };
				});

			newState.maxNumberPatient = (firstSchedule && firstSchedule.maxNumber) || 0;

			if (!_.isEmpty(newTimesByDate)) {
				newState.times = newTimesByDate;
			}

			this.setState({ ...newState });
		}

		if (prevProps.loadingSchedule !== loadingSchedule) {
			if (loadingSchedule) {
				this.setState({
					message: {
						text: 'Creating data ...',
						type: 'info',
					},
				});
			} else {
				this.setState({
					message: messageSchedule,
				});
			}
		}

		if (prevProps.messageSchedule !== messageSchedule) {
			if (['success', 'info'].includes(messageSchedule.type)) {
				const optionsDoctor = this.buildDoctorsSelect(doctors);
				const newTimes = !_.isEmpty(times) && times.map((time) => ({ ...time, isActive: false }));

				this.setState({
					currentDate: new Date(),
					maxNumberPatient: '',
					times: newTimes,
					select: {
						list: optionsDoctor || [],
						selected: null,
					},
					message: {
						text: '',
						type: '',
					},
				});

				toast.success(<HtmlRaw>{`${messageSchedule.text}`}</HtmlRaw>);
			} else if (messageSchedule.type === 'error') {
				toast.error(<HtmlRaw>{`${messageSchedule.text}`}</HtmlRaw>);
			}

			this.setState({
				message: messageSchedule,
			});
		}
	}

	render() {
		const { currentDate, select, times, maxNumberPatient, message } = this.state;
		const { intl, language } = this.props;
		const keyLang = Functions.toCapitalizeCase(language);
		const selectLang = {
			placeholder: intl.formatMessage({ id: 'form.others.list-of-doctors' }),
			noMatched: intl.formatMessage({ id: 'app.no-results-found' }),
		};

		return (
			<>
				<div className={SystemStyles.titleMain}>
					<FormattedMessage id="menu.doctor.user-management.types.schedule" />
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
									<FormattedMessage id="form.actions.choose-a-doctor" />:
								</label>
								<Select
									placeholder={selectLang.placeholder}
									value={select.selected}
									options={select.list}
									isSearchable
									noOptionsMessage={() => selectLang.noMatched}
									onChange={this.handleChangeDoctor}
								/>
							</div>
							<div className="col-4 mb-3">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-date" />:
								</label>
								<DatePicker
									className="form-control"
									selected={currentDate}
									minDate={subDays(new Date(), 0)}
									disabledKeyboardNavigation
									closeOnScroll={true}
									onChange={(date) => this.handleChangeDate(date)}
								/>
							</div>
							<div className="col-4 mb-3">
								<label className="fw-bold mb-1" htmlFor="maxNumberPatient">
									<FormattedMessage id="form.attributes.maxNumberPatient" />:
								</label>
								<input
									type="text"
									className="form-control"
									id="maxNumberPatient"
									name="maxNumberPatient"
									required
									value={maxNumberPatient || 0}
									onChange={(event) => this.handleChangeNumberPatient(event)}
								/>
							</div>
							<div className="col-12">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-time" />:
								</label>
								<ul className="list-unstyled p-0 m-0">
									{!_.isEmpty(times)
										? times.map((time) => {
												return (
													<button
														type="button"
														className={`btn btn-outline-success ${
															time.isActive && 'active'
														} me-2 mb-2`}
														key={time.id}
														onClick={() => this.handleChooseTime(time.id)}
													>
														{time[`value${keyLang}`]}
													</button>
												);
										  })
										: ''}
								</ul>
							</div>
						</div>
						<button
							type="button"
							className="btn btn-sm btn-primary px-3 py-2"
							onClick={() => this.handleSave()}
						>
							<i>
								<FontAwesomeIcon className="me-2" icon={faFloppyDisk} />
							</i>
							<FormattedMessage id="form.actions.save" />
						</button>
					</form>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		loadingSchedule: state.schedule.loading,
		messageSchedule: state.schedule.message,
		schedulesByDate: state.schedule.schedulesByDate,
		doctors: state.doctor.doctors,
		times: state.allCode.times.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDoctors: () => dispatch(actions.fetchDoctors()),
		fetchAllCode: (type) => dispatch(actions.fetchAllCode(type)),
		createSchedule: (data) => dispatch(actions.createSchedule(data)),
		getScheduleByDate: (doctorId, date) => dispatch(actions.getScheduleByDate(doctorId, date)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DoctorSchedule));
