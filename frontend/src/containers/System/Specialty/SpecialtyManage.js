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
import { Functions } from '../../../utils';
import SystemStyles from '../../../styles/System.module.scss';

// Init a markdown parser
const mdParser = new MarkdownIt();

class SpecialtyManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameSpecialty: '',
			avatar: '',
			contentHTML: '',
			contentMarkdown: '',
			isZoomAvatar: false,
			message: {
				text: '',
				type: '',
			},
		};
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
			if (['nameSpecialty'].includes(inputs[index]) && !this.state[inputs[index]]) {
				message.type = inputs[index];
				message.text = `${inputs[index][0].toUpperCase()}${inputs[index].slice(1)} is missing`;
				break;
			}
		}

		return message;
	};

	handleCreate = () => {
		const message = this.handleValidateInput();

		if (message.text) {
			document.getElementById(`${message.type}`).focus();
			toast.error(message.text);
		} else {
			console.log(this.state);
		}
	};

	componentDidUpdate(prevProps) {}

	render() {
		const { nameSpecialty, avatar, contentMarkdown, isZoomAvatar, message } = this.state;

		return (
			<>
				<div className={SystemStyles.titleMain}>
					<FormattedMessage id="menu.admin.specialty-management.types.specialty" />
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
							<div className="col-12 mb-3">
								<label className="fw-bold mb-1" htmlFor="nameSpecialty">
									<FormattedMessage id="form.attributes.nameSpecialty" />:
								</label>
								<input
									type="text"
									className="form-control"
									id="nameSpecialty"
									name="nameSpecialty"
									required
									value={nameSpecialty}
									onChange={(event) => this.handleOnChangeInput(event, 'nameSpecialty')}
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);
