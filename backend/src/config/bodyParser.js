import bodyParser from 'body-parser';

let configBodyParser = (app) => {
	app.use(bodyParser.json({ limit: '10mb' }));
	app.use(
		bodyParser.urlencoded({
			limit: '10mb',
			extended: true,
		}),
	);
};

module.exports = configBodyParser;
