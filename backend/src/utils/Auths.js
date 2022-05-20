import jwt from 'jsonwebtoken';

let Auths = {
	generateAccessToken: (user) => {
		return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
			expiresIn: '10s',
		});
	},

	generateRefreshToken: (user) => {
		return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET_KEY);
	},

	verify: (req, res, next) => {
		const authHeader = req.headers.authorization;
		const message = {
			status: '',
			text: '',
			type: '',
		};

		if (authHeader) {
			const token = authHeader.split(' ')[1];

			jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
				if (error) {
					message.status = 403;
					message.type = 'error';
					message.text = 'Token is not valid';
				} else {
					req.user = user;
					next();
				}
			});
		} else {
			message.status = 401;
			message.type = 'error';
			message.text = 'You are not authenticated';
		}

		if (message.type === 'error') {
			return res.send({ message });
		}
	},
};

module.exports = Auths;
