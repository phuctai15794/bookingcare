import express from 'express';
import configViewEngine from './config/viewEngine';
import configBodyParser from './config/bodyParser';
import configSession from './config/session';
import methodOverride from 'method-override';
import route from './route';
import connect from './config/connect';
import dotenv from 'dotenv';
import cors from 'cors';

// Init dotenv
dotenv.config();

// Init express app
let app = express();

// CORS
app.use(
	cors({
		origin: true,
	}),
);

// Method override for HTTP
app.use(methodOverride('_method'));

// Config session
configSession(app);

// Config body parser
configBodyParser(app);

// Config view
configViewEngine(app);

// Config route
route(app);

// Connect database
connect();

// Get env
let port = process.env.PORT || 8000;

// Run
app.listen(port, () => {
	console.log(`Backend's running on: http://localhost:${port}`);
});
