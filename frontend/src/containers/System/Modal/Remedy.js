import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
// import { toast } from 'react-toastify';
import SystemStyles from '../../../styles/System.module.scss';

class Remedy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attributes: {
				firstName: '',
				lastName: '',
				phone: '',
				email: '',
				address: '',
				medicalReason: '',
				gender: '',
				clinicDate: new Date(),
			},
			message: {
				text: '',
				type: '',
			},
		};
		this.resetFile = React.createRef();
	}

	componentDidMount() {}

	render() {
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
											readOnly
											value={dataConfirm.email}
										/>
									</div>
								</div>
							</form>
						</div>
						<div className={SystemStyles.modalMainFooter}>
							<button className="btn btn-sm btn-primary px-3 py-2 me-2">
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Remedy);
