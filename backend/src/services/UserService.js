import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import { Auths } from '../utils';

let refreshTokens = [];
const salt = bcrypt.genSaltSync(10);

let list = () => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.User.findAll();
			resole(data);
		} catch (error) {
			reject(error);
		}
	});
};

let detail = (id) => {
	return new Promise(async (resole, reject) => {
		try {
			const detail = await db.User.findOne({
				where: { id },
			});

			resole(detail);
		} catch (error) {
			reject(error);
		}
	});
};

let destroy = (id) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};
			const detail = await db.User.findOne({
				where: { id },
			});

			if (detail !== null) {
				await db.User.destroy({
					where: { id },
				});

				message.text = 'Delete user successfully';
				message.type = 'success';
			} else {
				message.text = 'Data is invalid';
				message.type = 'warning';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

let update = (id, data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};
			const detail = await db.User.findOne({
				where: { id },
			});

			if (detail === null) {
				message.text = 'Data is invalid';
				message.type = 'warning';
			} else {
				await db.User.update(
					{
						firstName: data.firstName,
						lastName: data.lastName,
						email: data.email,
						phone: data.phone,
						gender: data.gender,
						roleId: data.roleId,
						updatedAt: new Date(),
					},
					{
						where: { id },
					},
				);

				message.text = 'Update user successfully';
				message.type = 'success';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

let create = (data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};
			const detail = await db.User.findOne({
				where: {
					email: data.email,
				},
			});

			if (detail === null) {
				const passwordHash = await hashPassword(data.password);

				await db.User.create({
					roleId: data.roleId,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					password: passwordHash,
					address: data.address,
					gender: data.gender,
					phone: data.phone,
				});

				message.text = 'Create user successfully';
				message.type = 'success';
			} else {
				message.text = 'User already exists';
				message.type = 'warning';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

let hashPassword = (password) => {
	return new Promise(async (resole, reject) => {
		try {
			const hashPassword = await bcrypt.hashSync(password, salt);
			resole(hashPassword);
		} catch (e) {
			reject(error);
		}
	});
};

let checkEmail = (email) => {
	return new Promise(async (resole, reject) => {
		try {
			const user = await db.User.findOne({
				where: { email },
			});

			if (user) {
				resole(true);
			} else {
				resole(false);
			}
		} catch (error) {
			reject(error);
		}
	});
};

let comparePassword = (password, passwordHash) => {
	return new Promise(async (resole, reject) => {
		try {
			const isEqual = await bcrypt.compareSync(password, passwordHash);

			if (isEqual) {
				resole(true);
			} else {
				resole(false);
			}
		} catch (error) {
			reject(error);
		}
	});
};

let loginAPI = (email, password) => {
	return new Promise(async (resole, reject) => {
		try {
			const isEmailExist = await checkEmail(email);
			let result = {
				message: {
					type: '',
					text: '',
				},
				user: {},
				accessToken: '',
				refreshToken: '',
			};

			if (isEmailExist) {
				const user = await db.User.findOne({
					where: { email },
				});
				const isEqual = await comparePassword(password, user.password);

				if (isEqual) {
					delete user.password;
					result.user = user;
					result.accessToken = Auths.generateAccessToken(user);
					result.refreshToken = Auths.generateRefreshToken(user);
					result.message.type = 'success';
					result.message.text = 'Logged in successfully';
					refreshTokens.push(result.refreshToken);
				} else {
					result.message.type = 'error';
					result.message.text = 'Your password is wrong';
				}
			} else {
				result.message.type = 'error';
				result.message.text = 'Your email does not exist';
			}

			resole(result);
		} catch (error) {
			reject(error);
		}
	});
};

let logoutAPI = (refreshToken) => {
	const message = {
		status: '',
		text: '',
		type: '',
	};
	refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
	message.status = 200;
	message.type = 'success';
	message.text = 'You logged out successfully';
	return message;
};

let refreshTokenAPI = (refreshToken) => {
	const message = {
		status: '',
		text: '',
		type: '',
	};
	let newAccessToken = '';
	let newRefreshToken = '';

	if (!refreshToken) {
		message.status = 401;
		message.type = 'error';
		message.text = 'You are not authenticated';
	} else if (!refreshTokens.includes(refreshToken)) {
		message.status = 403;
		message.type = 'error';
		message.text = 'Refresh token is not valid';
	} else {
		jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (err, user) => {
			err && console.log(err);
			refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
			newAccessToken = Auths.generateAccessToken(user);
			newRefreshToken = Auths.generateRefreshToken(user);
			refreshTokens.push(newRefreshToken);
		});
	}

	return {
		message,
		newAccessToken,
		newRefreshToken,
	};
};

let listAPI = () => {
	return new Promise(async (resole, reject) => {
		try {
			const data = await db.User.findAll({
				attributes: {
					exclude: ['password'],
				},
				order: [['createdAt', 'DESC']],
			});

			resole(data);
		} catch (error) {
			reject(error);
		}
	});
};

let createAPI = (data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};
			const detail = await db.User.findOne({
				where: {
					email: data.email,
				},
			});

			if (detail === null) {
				const passwordHash = await hashPassword(data.password);

				await db.User.create({
					roleId: data.roleId,
					positionId: data.positionId,
					firstName: data.firstName,
					lastName: data.lastName,
					image: data.avatar,
					email: data.email,
					password: passwordHash,
					address: data.address,
					gender: data.gender,
					phone: data.phone,
				});

				message.text = 'Create user successfully';
				message.type = 'success';
			} else {
				message.text = 'User already exists';
				message.type = 'error';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

let updateAPI = (id, data) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};
			const detail = await db.User.findOne({
				where: { id },
			});

			if (detail === null) {
				message.text = 'Data is invalid';
				message.type = 'error';
			} else {
				await db.User.update(
					{
						roleId: data.roleId,
						positionId: data.positionId,
						firstName: data.firstName,
						lastName: data.lastName,
						image: data.avatar,
						address: data.address,
						phone: data.phone,
						gender: data.gender,
						updatedAt: new Date(),
					},
					{
						where: { id },
					},
				);

				message.text = 'Update user successfully';
				message.type = 'success';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

let destroyAPI = (id) => {
	return new Promise(async (resole, reject) => {
		try {
			const message = {
				text: '',
				type: '',
			};
			const detail = await db.User.findOne({
				where: { id },
			});

			if (detail !== null) {
				await db.User.destroy({
					where: { id },
				});

				message.text = 'Delete user successfully';
				message.type = 'success';
			} else {
				message.text = 'Data is invalid';
				message.type = 'error';
			}

			resole(message);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	list,
	detail,
	update,
	destroy,
	create,
	loginAPI,
	logoutAPI,
	refreshTokenAPI,
	listAPI,
	createAPI,
	updateAPI,
	destroyAPI,
};
