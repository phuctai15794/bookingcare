import UserService from '../services/UserService';

let list = async (req, res) => {
	const users = await UserService.list();
	const message = req.session.message ? req.session.message : undefined;

	if (req.session) {
		req.session.destroy();
	}

	return res.render('user/list', {
		title: 'List of users',
		message: message,
		users: users,
	});
};

let update = async (req, res) => {
	const id = req.params.id;
	const data = req.body;
	req.session.message = {};

	if (!id) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Data is invalid';
	} else if (!data.email) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your email';
	} else if (!data.firstName) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your first name';
	} else if (!data.lastName) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your last name';
	} else if (!data.address) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your address';
	} else if (!data.phone) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your phone';
	} else if (!data.gender) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your gender';
	} else if (!data.roleId) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your role ID';
	} else {
		req.session.message = await UserService.update(id, data);
	}

	return res.redirect(301, `/user/detail/${id}`);
};

let destroy = async (req, res) => {
	const id = req.params.id;
	req.session.message = {};

	if (!id) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Data is invalid';
	} else {
		req.session.message = await UserService.destroy(id);
	}

	return res.redirect(301, '/user/list');
};

let detail = async (req, res) => {
	const id = req.params.id;
	const detail = await UserService.detail(id);
	const message = req.session.message ? req.session.message : undefined;

	if (req.session) {
		req.session.destroy();
	}

	return res.render('user/detail', {
		title: 'User detail',
		message: message,
		detail: detail,
	});
};

let create = async (req, res) => {
	try {
		const message = req.session.message ? req.session.message : undefined;

		if (req.session) {
			req.session.destroy();
		}

		return res.render('user/create', {
			title: 'Create a user',
			message: message,
		});
	} catch (error) {
		console.log(error);
	}
};

let save = async (req, res) => {
	const data = req.body;
	req.session.message = {};

	if (!data.email) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your email';
	} else if (!data.password) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your password';
	} else if (!data.firstName) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your first name';
	} else if (!data.lastName) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your last name';
	} else if (!data.address) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your address';
	} else if (!data.phone) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your phone';
	} else if (!data.gender) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your gender';
	} else if (!data.roleId) {
		req.session.message.type = 'warning';
		req.session.message.text = 'Please enter your role ID';
	} else {
		req.session.message = await UserService.create(data);
	}

	return res.redirect(301, '/user/create');
};

let loginAPI = async (req, res) => {
	let data = req.body;
	let result = {
		message: {
			type: '',
			text: '',
		},
		user: {},
		accessToken: '',
		refreshToken: '',
	};

	if (!data.email) {
		result.message.type = 'error';
		result.message.text = 'Please enter your email';
	} else if (!data.password) {
		result.message.type = 'error';
		result.message.text = 'Please enter your password';
	} else {
		result = await UserService.loginAPI(data.email, data.password);
	}

	return res.status(200).json({
		message: result.message,
		data: result.user,
		accessToken: result.accessToken,
		refreshToken: result.refreshToken,
	});
};

let logoutAPI = async (req, res) => {
	const refreshToken = req.body.token;
	const message = await UserService.logoutAPI(refreshToken);
	return res.status(200).json({ message });
};

let refreshTokenAPI = async (req, res) => {
	const refreshToken = req.body.token;
	const data = await UserService.refreshTokenAPI(refreshToken);

	return res.status(200).json({
		message: data.message,
		newAccessToken: data.newAccessToken,
		newRefreshToken: data.newRefreshToken,
	});
};

let listAPI = async (req, res) => {
	const users = await UserService.listAPI();

	return res.status(200).json({
		data: users,
	});
};

let createAPI = async (req, res) => {
	const data = req.body;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (!data.email) {
		result.message.type = 'error';
		result.message.text = 'Please enter your email';
	} else if (!data.password) {
		result.message.type = 'error';
		result.message.text = 'Please enter your password';
	} else if (!data.firstName) {
		result.message.type = 'error';
		result.message.text = 'Please enter your first name';
	} else if (!data.lastName) {
		result.message.type = 'error';
		result.message.text = 'Please enter your last name';
	} else if (!data.address) {
		result.message.type = 'error';
		result.message.text = 'Please enter your address';
	} else if (!data.phone) {
		result.message.type = 'error';
		result.message.text = 'Please enter your phone';
	} else if (!data.gender) {
		result.message.type = 'error';
		result.message.text = 'Please enter your gender';
	} else if (!data.roleId) {
		result.message.type = 'error';
		result.message.text = 'Please enter your role ID';
	} else {
		result.message = await UserService.createAPI(data);
	}

	return res.status(200).json({
		message: result.message,
	});
};

let updateAPI = async (req, res) => {
	const id = req.params.id;
	let data = req.body;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (!id) {
		result.message.type = 'error';
		result.message.text = 'Data is invalid';
	} else if (!data.firstName) {
		result.message.type = 'error';
		result.message.text = 'Please enter your first name';
	} else if (!data.lastName) {
		result.message.type = 'error';
		result.message.text = 'Please enter your last name';
	} else if (!data.address) {
		result.message.type = 'error';
		result.message.text = 'Please enter your address';
	} else if (!data.phone) {
		result.message.type = 'error';
		result.message.text = 'Please enter your phone';
	} else if (!data.gender) {
		result.message.type = 'error';
		result.message.text = 'Please enter your gender';
	} else if (!data.roleId) {
		result.message.type = 'error';
		result.message.text = 'Please enter your role ID';
	} else {
		result.message = await UserService.updateAPI(id, data);
	}

	return res.status(200).json({
		message: result.message,
	});
};

let destroyAPI = async (req, res) => {
	const id = req.params.id;
	let result = {
		message: {
			type: '',
			text: '',
		},
	};

	if (!id) {
		result.message.type = 'error';
		result.message.text = 'Data is invalid';
	} else {
		result.message = await UserService.destroyAPI(id);
	}

	return res.status(200).json({
		message: result.message,
	});
};

module.exports = {
	list,
	detail,
	create,
	update,
	delete: destroy,
	save,
	loginAPI,
	logoutAPI,
	refreshTokenAPI,
	listAPI,
	createAPI,
	updateAPI,
	deleteAPI: destroyAPI,
};
