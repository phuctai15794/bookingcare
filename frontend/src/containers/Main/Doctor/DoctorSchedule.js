import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Emitter, Functions } from '../../../utils';
import * as actions from '../../../store/actions';
import Booking from '../Modal/Booking';
import DoctorScheduleStyles from './DoctorSchedule.module.scss';

class DoctorSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenModal: false,
			timeBooking: null,
			selectedDay: '',
			daysOfWeek: [],
			schedulesByDate: [],
		};
	}

	listenToEmitter = () => {
		Emitter.on('CLOSE_MODAL_BOOKING', () => {
			this.setState({
				isOpenModal: false,
			});
		});
	};

	handleChangeDate = async (event) => {
		const { doctorId, getScheduleByDate } = this.props;
		const selectedDay = event.target.value;
		await getScheduleByDate(doctorId, selectedDay);

		this.setState({
			schedulesByDate: this.props.schedulesByDate,
			selectedDay,
		});
	};

	handleOpenModal = (time) => {
		this.setState({
			isOpenModal: true,
			timeBooking: time,
		});
		Emitter.emit('CLEAR_DATA_MODAL_BOOKING');
	};

	handleCloseModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};

	async componentDidMount() {
		const { language, doctorId, getScheduleByDate } = this.props;
		const daysOfWeek = Functions.getDaysOfWeek(language);

		this.listenToEmitter();

		if (!_.isEmpty(daysOfWeek)) {
			const [firstDay] = daysOfWeek;
			await getScheduleByDate(doctorId, firstDay.value);
			const { schedulesByDate } = this.props;

			if (schedulesByDate) {
				this.setState({
					schedulesByDate,
					daysOfWeek,
				});
			}
		}
	}

	componentDidUpdate(prevProps) {
		const { language } = this.props;

		if (prevProps.language !== language) {
			const daysOfWeek = Functions.getDaysOfWeek(language);

			this.setState({
				daysOfWeek,
			});
		}
	}

	render() {
		const { isOpenModal, timeBooking, selectedDay, daysOfWeek, schedulesByDate } = this.state;
		const { language, doctorId } = this.props;
		const keyLang = Functions.toCapitalizeCase(language);

		return (
			<>
				<div className={DoctorScheduleStyles.doctorSchedule}>
					<div className="row">
						<div className="col-4 mb-3">
							<select
								className="form-select"
								id="selectedDay"
								name="selectedDay"
								required
								value={selectedDay}
								onChange={(event) => this.handleChangeDate(event)}
							>
								{!_.isEmpty(daysOfWeek) &&
									daysOfWeek.map((day) => {
										return (
											<option key={day.value} value={day.value}>
												{day.label}
											</option>
										);
									})}
							</select>
						</div>
						<div className="col-12">
							<div className="mb-3">
								<FontAwesomeIcon className="me-2" icon={faCalendarDays} />
								<strong>
									<FormattedMessage id="app.medical-schedule" />:
								</strong>
							</div>
							{(!_.isEmpty(schedulesByDate) &&
								schedulesByDate.map((time) => {
									return (
										<button
											className={`btn ${DoctorScheduleStyles.doctorScheduleButtonTime} rounded-0 me-2 mb-2`}
											key={time.id}
											onClick={() => this.handleOpenModal(time)}
										>
											{time.timeData[`value${keyLang}`]}
										</button>
									);
								})) || (
								<div className="alert alert-warning mb-0">
									<FormattedMessage id="app.no-results-found" />
								</div>
							)}
							{!_.isEmpty(schedulesByDate) && (
								<p className="mt-2 mb-0">
									<FormattedMessage id="form.actions.choose-a-time" />{' '}
									<FontAwesomeIcon className="px-2" icon={faThumbsUp} />{' '}
									<FormattedMessage id="app.and-booking-free" />
								</p>
							)}
						</div>
					</div>
				</div>
				<Booking
					doctorId={doctorId}
					isOpenModal={isOpenModal}
					timeBooking={timeBooking}
					handleCloseModal={this.handleCloseModal}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		schedulesByDate: state.schedule.schedulesByDate,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getScheduleByDate: (doctorId, date) => dispatch(actions.getScheduleByDate(doctorId, date)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
