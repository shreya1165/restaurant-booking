import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookingModel } from "../../core/interfaces/booking";



export const BOOKING_STATE_NAME = 'booking';
const selectBookingState = createFeatureSelector<BookingModel>(BOOKING_STATE_NAME);

export const getBookingList = createSelector(
  selectBookingState,
  (state: BookingModel) => state.bookings
);

export const getErrorMessage = createSelector(
  selectBookingState,
  (state: BookingModel) => state.errorMessage
);

export const getSuccessMessage = createSelector(
    selectBookingState,
  (state: BookingModel) => state.success
);

export const bookingSpinner = createSelector(
    selectBookingState,
    (state: BookingModel) => state.bookingLoading
  );