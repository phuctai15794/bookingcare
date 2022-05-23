import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import { HtmlRaw, Functions } from '../../../utils';
import * as actions from '../../../store/actions';
import DoctorScheduleStyles from './DoctorSchedule.module.scss';

class DoctorSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDay: '',
			daysOfWeek: [],
		};
	}

	handleOnChangeSelect = (event) => {
		this.setState({
			selectedDay: event.target.value,
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
		const { language } = this.props;

		if (prevProps.language !== language) {
			const daysOfWeek = Functions.getDaysOfWeek(language);

			this.setState({
				daysOfWeek,
			});
		}
	}

	render() {
		const { selectedDay, daysOfWeek } = this.state;
		const { intl, doctorId } = this.props;
		const optionsDefaultLang = {
			daysOfWeek: intl.formatMessage({ id: 'form.others.list-of-date' }),
		};

		return (
			<>
				<div className={DoctorScheduleStyles.doctorSchedule}>
					<div className="row">
						<div className="col-4">
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
					</div>
					{`Doctor detail is: ${doctorId}`}
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DoctorSchedule));
