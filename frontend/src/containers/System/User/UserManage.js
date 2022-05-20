import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from '../../../store/actions';
import { HtmlRaw, SYSTEM_ACTIONS, Functions } from '../../../utils';
import UserList from './UserList';
import SystemStyles from '../../../styles/System.module.scss';

class UserManage extends Component {
	constructor(props) {
		super(props);
		this.resetFile = React.createRef();
		this.state = {
			action: SYSTEM_ACTIONS.CREATE,
			attributes: {
				id: '',
				avatar: '',
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				address: '',
				phone: '',
				gender: '',
				roleId: '',
				positionId: '',
			},
			idDelete: '',
			isZoomAvatar: false,
			dataGender: [],
			dataRole: [],
			dataPosition: [],
			message: {
				text: '',
				type: '',
			},
		};
	}

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
			attributes: {
				...this.state.attributes,
				avatar: avatarBase64,
			},
		});
	};

	handleZoomAvatar = () => {
		this.setState({
			isZoomAvatar: !this.state.isZoomAvatar,
		});
	};

	handleOnChangeInput = (event, input) => {
		this.setState({
			attributes: {
				...this.state.attributes,
				[input]: event.target.value,
			},
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleOnKeyPressInput = async (event) => {
		if (event.which === 13) {
			await this.handleSaveUser();
		}
	};

	handleValidateInput = () => {
		let message = {
			type: '',
			text: '',
		};
		let inputs = Object.keys(this.state.attributes);

		for (let i = 0; i < inputs.length; i++) {
			if (!['id', 'avatar'].includes(inputs[i]) && !this.state.attributes[inputs[i]]) {
				message.type = inputs[i];
				message.text = `${inputs[i][0].toUpperCase()}${inputs[i].slice(1)} is missing`;
				break;
			} else if (inputs[i] === 'email' && !Functions.isEmail(this.state.attributes[inputs[i]])) {
				message.type = inputs[i];
				message.text = `Email is invalid`;
				break;
			} else if (inputs[i] === 'phone' && !Functions.isPhone(this.state.attributes[inputs[i]])) {
				message.type = inputs[i];
				message.text = `Phone is invalid`;
				break;
			} else if (inputs[i] === 'firstName' && !Functions.isAlphaNum(this.state.attributes[inputs[i]])) {
				message.type = inputs[i];
				message.text = `First name is invalid`;
				break;
			} else if (inputs[i] === 'lastName' && !Functions.isAlphaNum(this.state.attributes[inputs[i]])) {
				message.type = inputs[i];
				message.text = `Last name is invalid`;
				break;
			}
		}

		return message;
	};

	handleCreateUser = async () => {
		await this.handleSaveUser();
	};

	handleUpdateUser = async () => {
		await this.handleSaveUser();
	};

	handleSaveUser = async () => {
		const message = this.handleValidateInput();

		if (message.text) {
			document.getElementById(`${message.type}`).focus();
			toast.error(message.text);
		} else {
			const { fetchUsers, createUser, updateUser, resetActionUser } = this.props;
			const { action } = this.state;
			const data = { ...this.state.attributes };

			if (action === SYSTEM_ACTIONS.CREATE) {
				delete data.id;
				await createUser(data);
				await resetActionUser('create');
			} else if (action === SYSTEM_ACTIONS.EDIT) {
				delete data.email;
				delete data.password;
				await updateUser(data);
				await resetActionUser('update');
			}

			await fetchUsers();
		}
	};

	handleEditUser = (user) => {
		const avatarBase64 = Functions.bufferToBase64(user.image);

		this.setState({
			action: SYSTEM_ACTIONS.EDIT,
			attributes: {
				id: user.id,
				avatar: avatarBase64,
				email: user.email,
				password: '******',
				firstName: user.firstName,
				lastName: user.lastName,
				address: user.address,
				phone: user.phone,
				gender: user.gender,
				roleId: user.roleId,
				positionId: user.positionId,
			},
			message: {
				text: '',
				type: '',
			},
		});
	};

	handleCancelEditUser = () => {
		this.setState({
			action: SYSTEM_ACTIONS.CREATE,
			attributes: {
				id: '',
				avatar: '',
				email: '',
				password: '',
				firstName: '',
				lastName: '',
				address: '',
				phone: '',
				gender: '',
				roleId: '',
				positionId: '',
			},
		});
	};

	handleDestroyUser = async (userId) => {
		const { deleteUser, fetchUsers, resetActionUser } = this.props;

		this.setState({
			idDelete: userId,
		});

		await deleteUser(userId);
		await fetchUsers();
		await resetActionUser('delete');
	};

	componentDidMount() {
		const { fetchAllCode } = this.props;
		fetchAllCode('GENDER');
		fetchAllCode('ROLE');
		fetchAllCode('POSITION');
	}

	async componentDidUpdate(prevProps) {
		const {
			messageCreateUser,
			messageUpdateUser,
			messageDeleteUser,
			genders,
			roles,
			positions,
			loadingCreateUser,
			loadingUpdateUser,
			loadingDeleteUser,
		} = this.props;
		const { attributes, idDelete } = this.state;

		if (prevProps.messageCreateUser.text !== messageCreateUser.text) {
			if (messageCreateUser.type === 'success') {
				this.setState({
					action: SYSTEM_ACTIONS.CREATE,
					attributes: {
						id: '',
						avatar: '',
						email: '',
						password: '',
						firstName: '',
						lastName: '',
						address: '',
						phone: '',
						gender: '',
						roleId: '',
						positionId: '',
					},
					idDelete: '',
					isZoomAvatar: false,
				});

				this.resetFile.current.value = '';

				toast.success(<HtmlRaw>{`${messageCreateUser.text}`}</HtmlRaw>);
			} else if (messageCreateUser.type === 'error') {
				toast.error(<HtmlRaw>{`${messageCreateUser.text}`}</HtmlRaw>);
			}
		}

		if (prevProps.loadingCreateUser !== loadingCreateUser) {
			if (loadingCreateUser) {
				this.setState({
					message: {
						text: 'Creating data ...',
						type: 'info',
					},
				});
			} else {
				this.setState({
					message: messageCreateUser,
				});
			}
		}

		if (prevProps.messageUpdateUser.text !== messageUpdateUser.text) {
			if (messageUpdateUser.type === 'success') {
				toast.success(<HtmlRaw>{`${messageUpdateUser.text}`}</HtmlRaw>);
			} else if (messageUpdateUser.type === 'error') {
				toast.error(<HtmlRaw>{`${messageUpdateUser.text}`}</HtmlRaw>);
			}

			this.setState({
				action: SYSTEM_ACTIONS.CREATE,
				attributes: {
					id: '',
					avatar: '',
					email: '',
					password: '',
					firstName: '',
					lastName: '',
					address: '',
					phone: '',
					gender: '',
					roleId: '',
					positionId: '',
				},
				idDelete: '',
				isZoomAvatar: false,
			});

			this.resetFile.current.value = '';
		}

		if (prevProps.loadingUpdateUser !== loadingUpdateUser) {
			if (loadingUpdateUser) {
				this.setState({
					message: {
						text: 'Updating data ...',
						type: 'info',
					},
				});
			} else {
				this.setState({
					message: messageUpdateUser,
				});
			}
		}

		if (prevProps.messageDeleteUser !== messageDeleteUser) {
			if (messageDeleteUser.type === 'success') {
				toast.success(<HtmlRaw>{`${messageDeleteUser.text}`}</HtmlRaw>);
			} else if (messageDeleteUser.type === 'error') {
				toast.error(<HtmlRaw>{`${messageDeleteUser.text}`}</HtmlRaw>);
			}

			if (idDelete === attributes.id) {
				this.setState({
					action: SYSTEM_ACTIONS.CREATE,
					attributes: {
						id: '',
						avatar: '',
						email: '',
						password: '',
						firstName: '',
						lastName: '',
						address: '',
						phone: '',
						gender: '',
						roleId: '',
						positionId: '',
					},
					idDelete: '',
					isZoomAvatar: false,
				});

				this.resetFile.current.value = '';
			}
		}

		if (prevProps.loadingDeleteUser !== loadingDeleteUser) {
			if (loadingDeleteUser) {
				this.setState({
					message: {
						text: 'Deleting data ...',
						type: 'info',
					},
				});
			} else {
				this.setState({
					message: messageDeleteUser,
				});
			}
		}

		if (prevProps.genders !== genders) {
			this.setState({
				dataGender: genders,
			});
		}

		if (prevProps.roles !== roles) {
			this.setState({
				dataRole: roles,
			});
		}

		if (prevProps.positions !== positions) {
			this.setState({
				dataPosition: positions,
			});
		}
	}

	render() {
		const { message, dataGender, dataRole, dataPosition, isZoomAvatar, action } = this.state;
		const { avatar, email, password, firstName, lastName, address, phone, gender, roleId, positionId } =
			this.state.attributes;
		const { intl, language } = this.props;
		const keyLang = `${language[0].toUpperCase()}${language.slice(1)}`;
		const optionsDefaultLang = {
			gender: intl.formatMessage({ id: 'form.attributes.gender.optionDefault' }),
			role: intl.formatMessage({ id: 'form.attributes.role.optionDefault' }),
			position: intl.formatMessage({ id: 'form.attributes.position.optionDefault' }),
		};

		return (
			<>
				<div className={SystemStyles.titleMain}>
					<FormattedMessage id="menu.admin.user-management.types.user" />
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
							<div className="col-3">
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
							<div className="col-3">
								<label className="fw-bold mb-1" htmlFor="email">
									<FormattedMessage id="form.attributes.email" />:
								</label>
								<input
									type="email"
									className="form-control"
									id="email"
									name="email"
									required
									value={email}
									disabled={action === SYSTEM_ACTIONS.EDIT ? 'disabled' : ''}
									onChange={(event) => this.handleOnChangeInput(event, 'email')}
									onKeyPress={(event) => this.handleOnKeyPressInput(event)}
								/>
							</div>
							<div className="col-3">
								<label className="fw-bold mb-1" htmlFor="password">
									<FormattedMessage id="form.attributes.password" />:
								</label>
								<input
									type="password"
									className="form-control"
									id="password"
									name="password"
									required
									value={password}
									disabled={action === SYSTEM_ACTIONS.EDIT ? 'disabled' : ''}
									onChange={(event) => this.handleOnChangeInput(event, 'password')}
									onKeyPress={(event) => this.handleOnKeyPressInput(event)}
								/>
							</div>
							<div className="col-3">
								<label className="fw-bold mb-1" htmlFor="firstName">
									<FormattedMessage id="form.attributes.firstName" />:
								</label>
								<input
									type="text"
									className="form-control"
									id="firstName"
									name="firstName"
									required
									value={firstName}
									onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
									onKeyPress={(event) => this.handleOnKeyPressInput(event)}
								/>
							</div>
							<div className="col-3">
								<label className="fw-bold mb-1" htmlFor="lastName">
									<FormattedMessage id="form.attributes.lastName" />:
								</label>
								<input
									type="text"
									className="form-control"
									id="lastName"
									name="lastName"
									required
									value={lastName}
									onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
									onKeyPress={(event) => this.handleOnKeyPressInput(event)}
								/>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-3">
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
									onKeyPress={(event) => this.handleOnKeyPressInput(event)}
								/>
							</div>
							<div className="col-3">
								<label className="fw-bold mb-1" htmlFor="phone">
									<FormattedMessage id="form.attributes.phone" />:
								</label>
								<input
									type="text"
									className="form-control"
									id="phone"
									name="phone"
									required
									value={phone}
									onChange={(event) => this.handleOnChangeInput(event, 'phone')}
									onKeyPress={(event) => this.handleOnKeyPressInput(event)}
								/>
							</div>
							<div className="col-2">
								<label className="fw-bold mb-1" htmlFor="gender">
									<FormattedMessage id="form.attributes.gender.title" />:
								</label>
								<select
									className="form-select"
									id="gender"
									name="gender"
									required
									value={gender}
									onChange={(event) => this.handleOnChangeInput(event, 'gender')}
								>
									<option value="">{optionsDefaultLang.gender}</option>
									{dataGender && dataGender.length
										? dataGender.map((gender) => {
												return (
													<option key={gender.id} value={gender.keyMap}>
														{gender[`value${keyLang}`]}
													</option>
												);
										  })
										: ''}
								</select>
							</div>
							<div className="col-2">
								<label className="fw-bold mb-1" htmlFor="roleId">
									<FormattedMessage id="form.attributes.role.title" />:
								</label>
								<select
									className="form-select"
									id="roleId"
									name="roleId"
									required
									value={roleId}
									onChange={(event) => this.handleOnChangeInput(event, 'roleId')}
								>
									<option value="">{optionsDefaultLang.role}</option>
									{dataRole && dataRole.length
										? dataRole.map((role) => {
												return (
													<option key={role.id} value={role.keyMap}>
														{role[`value${keyLang}`]}
													</option>
												);
										  })
										: ''}
								</select>
							</div>
							<div className="col-2">
								<label className="fw-bold mb-1" htmlFor="positionId">
									<FormattedMessage id="form.attributes.position.title" />:
								</label>
								<select
									className="form-select"
									id="positionId"
									name="positionId"
									required
									value={positionId}
									onChange={(event) => this.handleOnChangeInput(event, 'positionId')}
								>
									<option value="">{optionsDefaultLang.position}</option>
									{dataPosition && dataPosition.length
										? dataPosition.map((position) => {
												return (
													<option key={position.id} value={position.keyMap}>
														{position[`value${keyLang}`]}
													</option>
												);
										  })
										: ''}
								</select>
							</div>
						</div>
						{action === SYSTEM_ACTIONS.EDIT ? (
							<>
								<button
									type="button"
									className="btn btn-sm btn-warning me-2 px-3 py-2"
									onClick={() => this.handleUpdateUser()}
								>
									<i>
										<FontAwesomeIcon className="me-2" icon={faFloppyDisk} />
									</i>
									<FormattedMessage id="form.actions.update" />
								</button>
								<button
									type="button"
									className="btn btn-sm btn-danger px-3 py-2"
									onClick={() => this.handleCancelEditUser()}
								>
									<i>
										<FontAwesomeIcon className="me-2" icon={faTimes} />
									</i>
									<FormattedMessage id="form.actions.cancel" />
								</button>
							</>
						) : (
							<button
								type="button"
								className="btn btn-sm btn-primary px-3 py-2"
								onClick={() => this.handleCreateUser()}
							>
								<i>
									<FontAwesomeIcon className="me-2" icon={faPlus} />
								</i>
								<FormattedMessage id="form.actions.create" />
							</button>
						)}
					</form>

					<hr className="mt-4 mb-4" />

					<UserList handleEditUser={this.handleEditUser} handleDestroyUser={this.handleDestroyUser} />
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
		messageCreateUser: state.user.actions.create.message,
		loadingCreateUser: state.user.actions.create.loading,
		messageUpdateUser: state.user.actions.update.message,
		loadingUpdateUser: state.user.actions.update.loading,
		messageDeleteUser: state.user.actions.delete.message,
		loadingDeleteUser: state.user.actions.delete.loading,
		genders: state.allCode.genders.data,
		roles: state.allCode.roles.data,
		positions: state.allCode.positions.data,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		resetActionUser: (action) => dispatch(actions.resetActionUser(action)),
		createUser: (data) => dispatch(actions.createUser(data)),
		updateUser: (data) => dispatch(actions.updateUser(data)),
		deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
		fetchAllCode: (type) => dispatch(actions.fetchAllCode(type)),
		fetchUsers: () => dispatch(actions.fetchUsers()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserManage));
