import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Functions, HtmlRaw } from '../../../utils';
import * as actions from '../../../store/actions';
import SystemStyles from '../../../styles/System.module.scss';

// Init a markdown parser
const mdParser = new MarkdownIt();

class ClinicManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameClinic: '',
			address: '',
			avatar: '',
			contentHTML: '',
			contentMarkdown: '',
			isZoomAvatar: false,
			message: {
				text: '',
				type: '',
			},
		};
		this.resetFile = React.createRef();
	}

	handleOnChangeEditor = ({ html, text }) => {
		this.setState({
			contentHTML: html,
			contentMarkdown: text,
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleOnChangeInput = (event, type) => {
		this.setState({
			[type]: event.target.value,
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleZoomAvatar = () => {
		this.setState({
			isZoomAvatar: !this.state.isZoomAvatar,
		});
	};

	handleOnChangeAvatar = async (event) => {
		const avatar = event.target.files[0];
		let avatarBase64 = '';

		if (avatar && avatar.size) {
			if (['image/jpeg', 'image/png', 'image/gif'].includes(avatar.type)) {
				avatarBase64 = await Functions.toBase64(avatar);
			} else {
				toast.error('Avatar is invalid');
			}
		}

		this.setState({
			...this.state,
			avatar: avatarBase64,
		});
	};

	handleValidateInput = () => {
		let message = {
			type: '',
			text: '',
		};
		let inputs = Object.keys(this.state);

		for (let index = 0; index < inputs.length; index++) {
			if (['nameClinic', 'address'].includes(inputs[index]) && !this.state[inputs[index]]) {
				message.type = inputs[index];
				message.text = `${inputs[index][0].toUpperCase()}${inputs[index].slice(1)} is missing`;
				break;
			}
		}

		return message;
	};

	handleCreate = async () => {
		const message = this.handleValidateInput();

		if (message.text) {
			document.getElementById(`${message.type}`).focus();
			toast.error(message.text);
		} else {
			const { createClinic } = this.props;
			const data = {
				image: this.state.avatar,
				contentHTML: this.state.contentHTML,
				contentMarkdown: this.state.contentMarkdown,
				name: this.state.nameClinic,
				address: this.state.address,
			};

			await createClinic(data);
		}
	};

	componentDidUpdate(prevProps) {
		const { loadingCreateClinic, messageCreateClinic } = this.props;

		if (prevProps.loadingCreateClinic !== loadingCreateClinic) {
			if (loadingCreateClinic) {
				this.setState({
					message: {
						text: 'Creating data ...',
						type: 'info',
					},
				});
			} else {
				this.setState({
					message: messageCreateClinic,
				});
			}
		}

		if (prevProps.messageCreateClinic !== messageCreateClinic) {
			if (['success', 'info'].includes(messageCreateClinic.type)) {
				this.setState({
					nameClinic: '',
					address: '',
					avatar: '',
					contentHTML: '',
					contentMarkdown: '',
					isZoomAvatar: false,
					message: {
						text: '',
						type: '',
					},
				});

				this.resetFile.current.value = '';

				toast.success(<HtmlRaw>{`${messageCreateClinic.text}`}</HtmlRaw>);
			} else if (messageCreateClinic.type === 'error') {
				toast.error(<HtmlRaw>{`${messageCreateClinic.text}`}</HtmlRaw>);
			}

			this.setState({
				message: messageCreateClinic,
			});
		}
	}

	render() {
		const { nameClinic, address, avatar, contentMarkdown, isZoomAvatar, message } = this.state;

		return (
			<>
				<div className={SystemStyles.titleMain}>
					<FormattedMessage id="menu.admin.clinic-management.types.clinic" />
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
							<div className="col-3 mb-3">
								<label className="d-block fw-bold mb-1">
									<FormattedMessage id="form.attributes.avatar" />:
								</label>
								<div className={SystemStyles.uploadFileLabel}>
									{avatar ? (
										<>
											<div className={`${SystemStyles.uploadFileImage} rounded mb-2`}>
												<img
													className="rounded img-upload"
													src={avatar}
													alt="avatar"
													onClick={() => this.handleZoomAvatar()}
												/>
											</div>
											{isZoomAvatar && (
												<Lightbox
													mainSrc={avatar}
													onCloseRequest={() => this.setState({ isZoomAvatar: false })}
												/>
											)}
										</>
									) : (
										''
									)}
									<input
										type="file"
										className="form-control"
										name="file"
										id="file"
										lang="vi"
										ref={this.resetFile}
										onChange={(event) => this.handleOnChangeAvatar(event)}
									/>
								</div>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-6 mb-3">
								<label className="fw-bold mb-1" htmlFor="nameClinic">
									<FormattedMessage id="form.attributes.nameClinic" />:
								</label>
								<input
									type="text"
									className="form-control"
									id="nameClinic"
									name="nameClinic"
									required
									value={nameClinic}
									onChange={(event) => this.handleOnChangeInput(event, 'nameClinic')}
								/>
							</div>
							<div className="col-6 mb-3">
								<label className="fw-bold mb-1" htmlFor="address">
									<FormattedMessage id="form.attributes.address" />:
								</label>
								<input
									type="text"
									className="form-control"
									id="address"
									name="address"
									required
									value={address}
									onChange={(event) => this.handleOnChangeInput(event, 'address')}
								/>
							</div>
							<div className="col-12">
								<label className="fw-bold mb-1">
									<FormattedMessage id="form.attributes.content" />:
								</label>
								{
									<MdEditor
										style={{ height: '400px' }}
										renderHTML={(text) => mdParser.render(text)}
										onChange={this.handleOnChangeEditor}
										value={contentMarkdown}
									/>
								}
							</div>
						</div>
						<button
							type="button"
							className="btn btn-sm btn-primary px-3 py-2"
							onClick={() => this.handleCreate()}
						>
							<i>
								<FontAwesomeIcon className="me-2" icon={faPlus} />
							</i>
							<FormattedMessage id="form.actions.create" />
						</button>
					</form>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loadingCreateClinic: state.clinic.actions.create.loading,
		messageCreateClinic: state.clinic.actions.create.message,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createClinic: (data) => dispatch(actions.createClinic(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
