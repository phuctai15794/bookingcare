import React, { Component } from 'react';
import { connect } from 'react-redux';
// import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
// import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { HtmlRaw, Constants, Functions } from '../../../utils';
// import * as actions from '../../../store/actions';
import SystemStyles from '../../../styles/System.module.scss';

class DoctorPatient extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

	componentDidMount() {}

	componentDidUpdate() {}

	render() {
		const { currentDate, message } = this.state;

		return (
			<>
				<div className={SystemStyles.titleMain}>
					<FormattedMessage id="menu.doctor.patient-management.types.patient" />
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPatient);
