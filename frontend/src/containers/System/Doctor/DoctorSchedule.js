import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import subDays from 'date-fns/subDays';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HtmlRaw, LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions';
import SystemStyles from '../../../styles/System.module.scss';

class DoctorSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			times: [],
			startDate: new Date(),
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
		const { getDetailDoctor } = this.props;
		await getDetailDoctor(selectedOption.value);

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
			startDate: selectedDated,
		});
	};

	buildDoctorsSelect = (doctors) => {
		const { language } = this.props;

		return (
			doctors &&
			doctors.map((doctor) => ({
				value: doctor.id,
				label:
					language === LANGUAGES.VI
						? `${doctor.firstName} ${doctor.lastName}`
						: language === LANGUAGES.EN
						? `${doctor.lastName} ${doctor.firstName}`
						: '',
			}))
		);
	};

	async componentDidMount() {
		const { fetchDoctors, fetchAllCode } = this.props;
		await fetchDoctors();
		await fetchAllCode('TIME');
	}

	componentDidUpdate(prevProps) {
		const { language, doctors, doctorDetail, times, messageDoctor } = this.props;

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
			const newTimes = times.map((time) => ({ ...time, isActive: false }));
			this.setState({
				times: newTimes,
			});
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

		if (prevProps.doctorDetail !== doctorDetail) {
			const optionsDoctor = this.buildDoctorsSelect(doctors);

			this.setState({
				select: {
					list: optionsDoctor || [],
					selected: {
						value: doctorDetail.id,
						label:
							language === LANGUAGES.VI
								? `${doctorDetail.firstName} ${doctorDetail.lastName}`
								: language === LANGUAGES.EN
								? `${doctorDetail.lastName} ${doctorDetail.firstName}`
								: '',
					},
				},
				message: {
					text: '',
					type: '',
				},
			});
		}
	}

	render() {
		const { startDate, select, times } = this.state;
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
					<form action="#" method="POST" onSubmit={(event) => event.preventDefault()}>
						<div className="row mb-3">
							<div className="col-3 mb-3">
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
							<div className="col-3 mb-3">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-date" />:
								</label>
								<DatePicker
									className="form-control"
									selected={startDate}
									minDate={subDays(new Date(), 0)}
									disabledKeyboardNavigation
									closeOnScroll={true}
									onChange={(date) => this.handleOnChangeDate(date)}
								/>
							</div>
							<div className="col-12">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.actions.choose-a-time" />:
								</label>
								<div>
									{times && times.length
										? times.map((time) => {
												return (
													<button
														className="btn btn-outline-success me-2 mb-2"
														key={time.id}
														value={time.keyMap}
													>
														{time[`value${keyLang}`]}
													</button>
												);
										  })
										: ''}
								</div>
							</div>
						</div>
						<button type="button" className="btn btn-sm btn-primary px-3 py-2">
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
		doctorDetail: state.doctor.doctorDetail,
		times: state.allCode.times.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDoctors: () => dispatch(actions.fetchDoctors()),
		getDetailDoctor: (id) => dispatch(actions.getDetailDoctor(id)),
		fetchAllCode: (type) => dispatch(actions.fetchAllCode(type)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DoctorSchedule));
