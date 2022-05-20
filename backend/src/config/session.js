import session from 'express-session';

let configSession = (app) => {
	app.set('trust proxy', 1);
	app.use(
		session({
			secret: 'backend',
			resave: false,
			saveUninitialized: true,
			cookie: {
				secure: false,
				maxAge: 6000000,
			},
		}),
	);
};

module.exports = configSession;
