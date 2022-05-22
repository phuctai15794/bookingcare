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

	handleOnChangeSelect = async (selectedOption) => {
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

	handleOnChangeDate = async (selectedDated) => {
		this.setState({
			currentDate: selectedDated,
		});
	};

	handleOnChangeInput = (event) => {
		this.setState({
			maxNumberPatient: event.target.value,
		});
	};

	handleSave = async () => {
		const { createScheduleDoctor } = this.props;
		const { times, select, currentDate } = this.state;
		const doctorSelected = select.selected;
		const dateSelected = Functions.formatDate(currentDate, Constants.DATE_FORMAT.DATETIME);
		const timesSelected = !_.isEmpty(times) && times.filter((time) => time.isActive);
		let result = [];

		if (_.isEmpty(doctorSelected)) {
			toast.error('Please choose a doctor');
		} else if (_.isEmpty(dateSelected) || (!_.isEmpty(dateSelected) && dateSelected === 'Invalid date')) {
			toast.error('Please choose a date');
		} else if (_.isEmpty(timesSelected)) {
			toast.error('Please choose a times');
		} else {
			timesSelected.forEach((timeSelected) => {
				let temp = {};
				temp.doctorId = doctorSelected.value;
				temp.date = dateSelected;
				temp.timeType = timeSelected.keyMap;
				result.push(temp);
			});

			if (!_.isEmpty(result)) {
				await createScheduleDoctor(result);
			}
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

	handleOnClickChooseTime = (timeId) => {
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
		const { language, doctors, times, loadingDoctor, messageDoctor } = this.props;

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

		if (prevProps.loadingDoctor !== loadingDoctor) {
			if (loadingDoctor) {
				this.setState({
					message: {
						text: 'Creating data ...',
						type: 'info',
					},
				});
			} else {
				this.setState({
					message: messageDoctor,
				});
			}
		}

		if (prevProps.messageDoctor !== messageDoctor) {
			if (messageDoctor.type === 'success') {
				const optionsDoctor = this.buildDoctorsSelect(doctors);

				this.setState({
					select: {
						list: optionsDoctor || [],
						selected: null,
					},
					message: {
						text: '',
						type: '',
					},
				});

				toast.success(<HtmlRaw>{`${messageDoctor.text}`}</HtmlRaw>);
			} else if (messageDoctor.type === 'error') {
				toast.error(<HtmlRaw>{`${messageDoctor.text}`}</HtmlRaw>);
			}

			this.setState({
				message: messageDoctor,
			});
		}
	}

	render() {
		const { currentDate, select, times, maxNumberPatient, message } = this.state;
		const { intl, language } = this.props;
		const keyLang = `${language[0].toUpperCase()}${language.slice(1)}`;
		const selectLang = {
			placeholder: intl.formatMessage({ id: 'form.others.list-of-doctor' }),
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
									onChange={this.handleOnChangeSelect}
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
									onChange={(date) => this.handleOnChangeDate(date)}
								/>
							</div>
							<div className="col-4 mb-3">
								<label className="fw-bold mb-1" htmlFor="maxNumberPatient">
									<FormattedMessage id="form.attributes.maxNumberPatient" />:
								</label>
								<input
									type="number"
									className="form-control"
									id="maxNumberPatient"
									name="maxNumberPatient"
									required
									value={maxNumberPatient}
									onChange={(event) => this.handleOnChangeInput(event)}
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
														onClick={() => this.handleOnClickChooseTime(time.id)}
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
		loadingDoctor: state.doctor.loading,
		messageDoctor: state.doctor.message,
		doctors: state.doctor.doctors,
		times: state.allCode.times.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDoctors: () => dispatch(actions.fetchDoctors()),
		fetchAllCode: (type) => dispatch(actions.fetchAllCode(type)),
		createScheduleDoctor: (data) => dispatch(actions.createScheduleDoctor(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DoctorSchedule));
