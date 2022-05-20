import express from 'express';
import expressLayouts from 'express-ejs-layouts';

let configViewEngine = (app) => {
	app.use(expressLayouts);
	app.use(express.static('./src/public'));
	app.set('layout', 'main');
	app.set('layout extractScripts', true);
	app.set('view engine', 'ejs');
	app.set('views', './src/views');
};

module.exports = configViewEngine;
