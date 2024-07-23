import { createAction, props } from "@ngrx/store";
import { BookingList } from "../../core/interfaces/booking";

export const LOAD_BOOKINGS_LIST = '[booking] load bookings list';
export const LOAD_BOOKINGS_SUCCESS = '[booking] load booking success';
export const LOAD_BOOKINGS_FAIL = '[booking] load booking fail';
export const RESET_SUCCESS = '[booking] reset success';

export const resetSuccess = createAction(RESET_SUCCESS);
export const booking = createAction(
    '[Booking] Book Restaurant Slot',
    props<{ booking: BookingList }>()
  );
 
export const bookingSuccess = createAction(
  '[Booking] Book Restaurant Slot Success',
  props<{ booking: BookingList[] }>()
);
  export const bookingFail = createAction(
    '[Booking] Book Restaurant Slot Fail',
    props<{ errorMessage: string }>()
  );  
export const loadBookingsList = createAction(LOAD_BOOKINGS_LIST);
export const loadBookingSuccess = createAction(
  LOAD_BOOKINGS_SUCCESS,
  props<{ bookings: BookingList[] }>()
);
export const loadBookingFail = createAction(
  LOAD_BOOKINGS_FAIL,
  props<{ errorMessage: string }>()
);

export const updateBooking = createAction(
  '[Booking] edit booking',
  props<{ bookings: BookingList, currentBookings: BookingList[] }>()
);
export const updateBookingSuccess = createAction(
  '[Booking] edit booking Success',
  props<{ booking: BookingList[], success: string }>()
);
export const updateBookingFail = createAction(
  '[Booking] Edit Booking Fail',
  props<{ errorMessage: string }>()
);
export const deleteBooking = createAction(
  '[Booking] delete booking',
  props<{ booking: BookingList, currentBookings: BookingList[] }>()
);
export const deleteBookingSuccess = createAction(
  '[Booking] delete booking Success',
  props<{ bookings: BookingList[], success: string }>()
);
export const deleteBookingFail = createAction(
  '[Booking] delete booking Fail',
  props<{ errorMessage: string }>()
);
