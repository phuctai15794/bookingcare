import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import { toast } from 'react-toastify';
import { Emitter, Functions, HtmlRaw } from '../../../utils';
import SystemStyles from '../../../styles/System.module.scss';

class Remedy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			fileAttach: '',
			message: {
				text: '',
				type: '',
			},
		};
		this.resetFile = React.createRef();
	}

	handleChangeFile = async (event) => {
		const file = event.target.files[0];
		let fileAttachBase64 = await Functions.toBase64(file);

		this.setState({
			...this.state,
			fileAttach: fileAttachBase64,
		});
	};

	handleChangeInput = (event, type) => {
		this.setState({
			[type]: event.target.value,
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleSend = () => {
		const { handleSend, dataConfirm } = this.props;
		handleSend({
			doctorId: dataConfirm.doctorId,
			patientId: dataConfirm.patientId,
			timeType: dataConfirm.timeType,
			email: this.state.email,
			fileAttach: this.state.fileAttach,
		});
	};

	componentDidMount() {
		const { dataConfirm } = this.props;

		if (dataConfirm) {
			this.setState({
				email: dataConfirm.email,
			});
		}
	}

	componentDidUpdate(prevProps) {
		const { dataConfirm, messageSendRemedy } = this.props;

		if (prevProps.dataConfirm !== dataConfirm) {
			this.setState({
				email: dataConfirm.email,
			});
		}

		if (prevProps.messageSendRemedy !== messageSendRemedy) {
			if (messageSendRemedy.type === 'success') {
				console.log(dataConfirm);
				Emitter.emit('CLOSE_MODAL_REMEDY');
				Emitter.emit('FETCH_APPOINTMENT', {
					doctorId: dataConfirm.doctorId,
					date: 0,
				});
				toast.success(<HtmlRaw>{`${messageSendRemedy.text}`}</HtmlRaw>);
			} else if (messageSendRemedy.type === 'error') {
				toast.error(<HtmlRaw>{`${messageSendRemedy.text}`}</HtmlRaw>);
			}
		}
	}

	render() {
		const { email } = this.state;
		const { isOpenModal, dataConfirm, handleCloseModal } = this.props;

		return (
			<>
				{dataConfirm && (
					<Modal
						className={SystemStyles.modalMain}
						size="md"
						isOpen={isOpenModal}
						centered={true}
						keyboard={true}
						backdrop={true}
					>
						<div className={SystemStyles.modalMainHeader}>
							<strong>
								<FormattedMessage id="app.remedy" />
							</strong>
							<button className="btn-close" type="button" onClick={handleCloseModal}></button>
						</div>
						<div className={SystemStyles.modalMainBody}>
							<form action="#" method="POST" onSubmit={(event) => event.preventDefault()}>
								<div className="row">
									<div className="col-8 mb-3">
										<label className="d-block fw-bold mb-1">
											<FormattedMessage id="form.attributes.fileAttach" />:
										</label>
										<div className={SystemStyles.uploadFileLabel}>
											<input
												type="file"
												className="form-control"
												name="file"
												id="file"
												lang="vi"
												ref={this.resetFile}
												onChange={(event) => this.handleChangeFile(event)}
											/>
										</div>
									</div>
									<div className="col-12">
										<label className="fw-bold mb-1" htmlFor="email">
											<FormattedMessage id="form.attributes.email" />:
										</label>
										<input
											type="text"
											className="form-control"
											id="email"
											name="email"
											required
											value={email}
											onChange={(event) => this.handleChangeInput(event, 'email')}
										/>
									</div>
								</div>
							</form>
						</div>
						<div className={SystemStyles.modalMainFooter}>
							<button className="btn btn-sm btn-primary px-3 py-2 me-2" onClick={this.handleSend}>
								<FormattedMessage id="form.actions.send" />
							</button>
							<button className="btn btn-sm btn-secondary px-3 py-2" onClick={handleCloseModal}>
								<FormattedMessage id="form.actions.cancel" />
							</button>
						</div>
					</Modal>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		messageSendRemedy: state.doctor.actions.sendRemedy.message,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Remedy);
