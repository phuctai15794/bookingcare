import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
// import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { HtmlRaw, Constants, Functions, LocalStorage } from '../../../utils';
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
