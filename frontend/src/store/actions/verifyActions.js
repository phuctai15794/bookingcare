import actionTypes from './actionTypes';
import { VerifyBookingPatientService } from '../../services/VerifyService';

export const verifyBookingPatient = (data) => {
	return async (dispatch) => {
		dispatch(verifyBookingPatientStart());
		await VerifyBookingPatientService(data)
			.then((response) => {
				dispatch(verifyBookingPatientSuccess(response.data.message));
			})
			.catch((error) => {
				dispatch(verifyBookingPatientFail(error));
			});
	};
};

export const verifyBookingPatientStart = () => ({
	type: actionTypes.VERIFY_BOOKING_PATIENT_START,
});

export const verifyBookingPatientSuccess = (message) => ({
	type: actionTypes.VERIFY_BOOKING_PATIENT_SUCCESS,
	message,
});

export const verifyBookingPatientFail = (error) => ({
	type: actionTypes.VERIFY_BOOKING_PATIENT_FAIL,
	error,
});
