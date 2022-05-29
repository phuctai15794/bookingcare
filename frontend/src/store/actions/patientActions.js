import actionTypes from './actionTypes';
import { BookingPatientService } from '../../services/patientService';

export const bookingPatient = (data) => {
	return async (dispatch) => {
		dispatch(bookingPatientStart());
		await BookingPatientService(data)
			.then((response) => {
				dispatch(bookingPatientSuccess(response.data.message));
			})
			.catch((error) => {
				dispatch(bookingPatientFail(error));
			});
	};
};

export const bookingPatientStart = () => ({
	type: actionTypes.BOOKING_PATIENT_START,
});

export const bookingPatientSuccess = (message) => ({
	type: actionTypes.BOOKING_PATIENT_SUCCESS,
	message,
});

export const bookingPatientFail = (error) => ({
	type: actionTypes.BOOKING_PATIENT_FAIL,
	error,
});
