import express from 'express';
import HomeController from '../controllers/HomeController';
import UserController from '../controllers/UserController';
import AllCodeController from '../controllers/AllCodeController';
import DoctorController from '../controllers/DoctorController';
import ScheduleController from '../controllers/ScheduleController';
import { Auths } from '../utils';

// Init
let router = express.Router();

// Routes
let route = (app) => {
	// Home
	router.get('/', HomeController.home);

	// User
	router.get('/user/list', UserController.list);
	router.get('/user/detail/:id', UserController.detail);
	router.put('/user/update/:id', UserController.update);
	router.delete('/user/delete/:id', UserController.delete);
	router.get('/user/create', UserController.create);
	router.post('/user/save', UserController.save);

	// API: User
	router.post('/api/login', UserController.loginAPI);
	router.post('/api/logout', Auths.verify, UserController.logoutAPI);
	router.post('/api/refresh', UserController.refreshTokenAPI);
	router.get('/api/user/list', UserController.listAPI);
	router.put('/api/user/update/:id', Auths.verify, UserController.updateAPI);
	router.delete('/api/user/delete/:id', Auths.verify, UserController.deleteAPI);
	router.post('/api/user/create', Auths.verify, UserController.createAPI);

	// API: AllCode
	router.get('/api/allcode/list', AllCodeController.listAPI);

	// API: Doctor
	router.get('/api/doctor/list', DoctorController.listAPI);
	router.get('/api/doctor/list-in-week', DoctorController.listInWeekAPI);
	router.post('/api/doctor/update-info', Auths.verify, DoctorController.updateInfoAPI);
	router.get('/api/doctor/detail/:id', DoctorController.getDetailAPI);

	// API: Schedule
	router.post('/api/schedule/create', Auths.verify, ScheduleController.createScheduleAPI);
	router.get('/api/schedule/by-date/:doctorId/:date', ScheduleController.getScheduleByDateAPI);
	router.get('/api/schedule/by-doctor/:doctorId', ScheduleController.getScheduleByDoctorAPI);

	return app.use('/', router);
};

module.exports = route;
