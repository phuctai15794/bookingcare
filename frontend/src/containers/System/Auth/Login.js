import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import * as actions from '../../../store/actions';
import LoginStyles from './Login.module.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isShowPassword: false,
			message: {
				type: '',
				text: '',
			},
		};
	}

	handleOnChangeLogin = (event, type) => {
		this.setState({
			[type]: event.target.value,
		});
	};

	handleOnClickShowHidePassword = () => {
		this.setState({
			isShowPassword: !this.state.isShowPassword,
		});
	};

	handleOnClickLogin = async () => {
		this.setState({
			message: {
				type: '',
				text: '',
			},
		});

		const { loginUser } = this.props;
		await loginUser(this.state.email, this.state.password);
	};

	handleOnKeyPressLogin = (event) => {
		if (event.which === 13) {
			this.handleOnClickLogin();
		} else {
			this.setState({
				message: {
					type: '',
					text: '',
				},
			});
		}
	};

	componentDidUpdate(prevProps) {
		const { messageLogin } = this.props;

		if (prevProps.messageLogin !== messageLogin) {
			this.setState({
				message: {
					type: messageLogin.type,
					text: messageLogin.text,
				},
			});
		}
	}

	render() {
		const { email, password, isShowPassword, message } = this.state;

		return (
			<>
				<div className={LoginStyles.loginForm}>
					<div className={LoginStyles.loginContainer}>
						<h2 className={LoginStyles.loginTitle}>Login</h2>
						<div className={LoginStyles.loginContent}>
							{message.type !== '' ? (
								<div className={`alert alert-${message.type === 'error' ? 'danger' : message.type}`}>
									{message.text}
								</div>
							) : (
								''
							)}
							<div className={LoginStyles.loginInput}>
								<label>Email:</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter your email"
									value={email}
									onChange={(event) => this.handleOnChangeLogin(event, 'email')}
									onKeyPress={(event) => this.handleOnKeyPressLogin(event)}
								/>
							</div>
							<div className={`${LoginStyles.loginInput} mb-4`}>
								<label>Password:</label>
								<div className="input-group">
									<input
										type={isShowPassword ? 'text' : 'password'}
										className="form-control"
										placeholder="Enter your password"
										value={password}
										onChange={(event) => this.handleOnChangeLogin(event, 'password')}
										onKeyPress={(event) => this.handleOnKeyPressLogin(event)}
									/>
									<div
										className="input-group-append"
										onClick={() => this.handleOnClickShowHidePassword()}
									>
										<span className="input-group-text h-100">
											<i>
												<FontAwesomeIcon icon={isShowPassword ? faEyeSlash : faEye} />
											</i>
										</span>
									</div>
								</div>
							</div>
							<button className={LoginStyles.loginButton} onClick={() => this.handleOnClickLogin()}>
								Login
							</button>
							<div className={LoginStyles.loginForgot}>Forgot your password ?</div>
							<div className={LoginStyles.loginOther}>
								<label className="mb-3">Or sign in with:</label>
								<div className={LoginStyles.loginIcons}>
									<a href="# " id={LoginStyles.facebook}>
										<i>
											<FontAwesomeIcon icon={faFacebookF} />
										</i>
									</a>
									<a href="# " id={LoginStyles.twitter}>
										<i>
											<FontAwesomeIcon icon={faTwitter} />
										</i>
									</a>
									<a href="# " id={LoginStyles.google}>
										<i>
											<FontAwesomeIcon icon={faGoogle} />
										</i>
									</a>
								</div>
							</div>
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
		messageLogin: state.user.message,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginUser: (email, password) => dispatch(actions.loginUser(email, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
