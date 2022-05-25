import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Functions } from '../../../utils';
import * as actions from '../../../store/actions';
import DoctorScheduleStyles from './DoctorSchedule.module.scss';

class DoctorSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDay: '',
			daysOfWeek: [],
			timesByDate: [],
		};
	}

	handleOnChangeSelect = async (event) => {
		const { doctorId, getScheduleByDate } = this.props;
		const selectedDay = event.target.value;
		await getScheduleByDate(doctorId, selectedDay);

		this.setState({
			selectedDay,
		});
	};

	async componentDidMount() {
		const { language, doctorId, getScheduleByDate } = this.props;
		const daysOfWeek = Functions.getDaysOfWeek(language);

		if (!_.isEmpty(daysOfWeek)) {
			const [firstDay] = daysOfWeek;
			await getScheduleByDate(doctorId, firstDay.value);
		}

		this.setState({
			daysOfWeek,
		});
	}

	componentDidUpdate(prevProps) {
		const { language, timesByDate } = this.props;

		if (prevProps.language !== language) {
			const daysOfWeek = Functions.getDaysOfWeek(language);

			this.setState({
				daysOfWeek,
			});
		}

		if (prevProps.timesByDate !== timesByDate) {
			this.setState({
				timesByDate,
			});
		}
	}

	render() {
		const { selectedDay, daysOfWeek, timesByDate } = this.state;
		const { language } = this.props;
		const keyLang = `${language[0].toUpperCase()}${language.slice(1)}`;

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
								onChange={(event) => this.handleOnChangeSelect(event)}
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
							{(!_.isEmpty(timesByDate) &&
								timesByDate.map((time) => {
									return (
										<button
											className={`btn ${DoctorScheduleStyles.doctorScheduleButtonTime} rounded-0 me-2 mb-2`}
											key={time.id}
										>
											{time.timeData[`value${keyLang}`]}
										</button>
									);
								})) || (
								<div className="alert alert-warning mb-0">
									<FormattedMessage id="app.no-results-found" />
								</div>
							)}
							{!_.isEmpty(timesByDate) && (
								<p className="mt-2 mb-0">
									<FormattedMessage id="form.actions.choose-a-time" />{' '}
									<FontAwesomeIcon className="px-2" icon={faThumbsUp} />{' '}
									<FormattedMessage id="app.and-booking-free" />
								</p>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		timesByDate: state.schedule.timesByDate,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getScheduleByDate: (doctorId, date) => dispatch(actions.getScheduleByDate(doctorId, date)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
