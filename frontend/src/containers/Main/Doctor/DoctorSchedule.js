import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { injectIntl } from 'react-intl';
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

	componentDidMount() {
		const { language } = this.props;
		const daysOfWeek = Functions.getDaysOfWeek(language);

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
		const { intl } = this.props;
		const optionsDefaultLang = {
			daysOfWeek: intl.formatMessage({ id: 'form.others.list-of-date' }),
		};

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
								<option value="">{optionsDefaultLang.daysOfWeek}</option>
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
						{!_.isEmpty(timesByDate) && (
							<div className="col-12">
								{timesByDate.map((time) => {
									return (
										<span className="btn btn-sm btn-outline-primary me-2 mb-1" key={time.id}>
											{time.timeType}
										</span>
									);
								})}
							</div>
						)}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DoctorSchedule));
