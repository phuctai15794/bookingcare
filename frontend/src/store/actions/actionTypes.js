const actionTypes = Object.freeze({
	// App
	CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

	// AllCode
	FETCH_GENDER_START: 'FETCH_GENDER_START',
	FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
	FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',
	FETCH_ROLE_START: 'FETCH_ROLE_START',
	FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
	FETCH_ROLE_FAIL: 'FETCH_ROLE_FAIL',
	FETCH_POSITION_START: 'FETCH_POSITION_START',
	FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
	FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',
	FETCH_TIME_START: 'FETCH_TIME_START',
	FETCH_TIME_SUCCESS: 'FETCH_TIME_SUCCESS',
	FETCH_TIME_FAIL: 'FETCH_TIME_FAIL',
	FETCH_PRICE_START: 'FETCH_PRICE_START',
	FETCH_PRICE_SUCCESS: 'FETCH_PRICE_SUCCESS',
	FETCH_PRICE_FAIL: 'FETCH_PRICE_FAIL',
	FETCH_PAYMENT_START: 'FETCH_PAYMENT_START',
	FETCH_PAYMENT_SUCCESS: 'FETCH_PAYMENT_SUCCESS',
	FETCH_PAYMENT_FAIL: 'FETCH_PAYMENT_FAIL',
	FETCH_PROVINCE_START: 'FETCH_PROVINCE_START',
	FETCH_PROVINCE_SUCCESS: 'FETCH_PROVINCE_SUCCESS',
	FETCH_PROVINCE_FAIL: 'FETCH_PROVINCE_FAIL',

	// User
	LOGIN_USER_START: 'LOGIN_USER_START',
	LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
	LOGIN_USER_FAIL: 'LOGIN_USER_FAIL',
	LOGOUT_USER_START: 'LOGOUT_USER_START',
	LOGOUT_USER_DONE: 'LOGOUT_USER_DONE',
	REFRESH_TOKEN_USER: 'REFRESH_TOKEN_USER',
	RESET_ACTION_USER: 'RESET_ACTION_USER',
	FETCH_USER_START: 'FETCH_USER_START',
	FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
	FETCH_USER_FAIL: 'FETCH_USER_FAIL',
	CREATE_USER_START: 'CREATE_USER_START',
	CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
	CREATE_USER_FAIL: 'CREATE_USER_FAIL',
	UPDATE_USER_START: 'UPDATE_USER_START',
	UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
	UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
	DELETE_USER_START: 'DELETE_USER_START',
	DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
	DELETE_USER_FAIL: 'DELETE_USER_FAIL',

	// Doctor
	FETCH_DOCTOR_START: 'FETCH_DOCTOR_START',
	FETCH_DOCTOR_SUCCESS: 'FETCH_DOCTOR_SUCCESS',
	FETCH_DOCTOR_FAIL: 'FETCH_DOCTOR_FAIL',
	FETCH_DOCTOR_IN_WEEK_START: 'FETCH_DOCTOR_IN_WEEK_START',
	FETCH_DOCTOR_IN_WEEK_SUCCESS: 'FETCH_DOCTOR_IN_WEEK_SUCCESS',
	FETCH_DOCTOR_IN_WEEK_FAIL: 'FETCH_DOCTOR_IN_WEEK_FAIL',
	UPDATE_INFO_DOCTOR_START: 'UPDATE_INFO_DOCTOR_START',
	UPDATE_INFO_DOCTOR_SUCCESS: 'UPDATE_INFO_DOCTOR_SUCCESS',
	UPDATE_INFO_DOCTOR_FAIL: 'UPDATE_INFO_DOCTOR_FAIL',
	GET_DETAIL_DOCTOR_START: 'GET_DETAIL_DOCTOR_START',
	GET_DETAIL_DOCTOR_SUCCESS: 'GET_DETAIL_DOCTOR_SUCCESS',
	GET_DETAIL_DOCTOR_FAIL: 'GET_DETAIL_DOCTOR_FAIL',
	GET_PROFILE_DOCTOR_START: 'GET_PROFILE_DOCTOR_START',
	GET_PROFILE_DOCTOR_SUCCESS: 'GET_PROFILE_DOCTOR_SUCCESS',
	GET_PROFILE_DOCTOR_FAIL: 'GET_PROFILE_DOCTOR_FAIL',
	GET_INFO_DOCTOR_START: 'GET_INFO_DOCTOR_START',
	GET_INFO_DOCTOR_SUCCESS: 'GET_INFO_DOCTOR_SUCCESS',
	GET_INFO_DOCTOR_FAIL: 'GET_INFO_DOCTOR_FAIL',

	// Patient
	BOOKING_PATIENT_START: 'BOOKING_PATIENT_START',
	BOOKING_PATIENT_SUCCESS: 'BOOKING_PATIENT_SUCCESS',
	BOOKING_PATIENT_FAIL: 'BOOKING_PATIENT_FAIL',

	// Schedule
	CREATE_SCHEDULE_START: 'CREATE_SCHEDULE_START',
	CREATE_SCHEDULE_SUCCESS: 'CREATE_SCHEDULE_SUCCESS',
	CREATE_SCHEDULE_FAIL: 'CREATE_SCHEDULE_FAIL',
	GET_SCHEDULE_BY_DATE_START: 'GET_SCHEDULE_BY_DATE_START',
	GET_SCHEDULE_BY_DATE_SUCCESS: 'GET_SCHEDULE_BY_DATE_SUCCESS',
	GET_SCHEDULE_BY_DATE_FAIL: 'GET_SCHEDULE_BY_DATE_FAIL',
});

export default actionTypes;
