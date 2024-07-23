import { createReducer, on } from "@ngrx/store";
import { booking, bookingFail, bookingSuccess, deleteBooking, deleteBookingFail, deleteBookingSuccess, loadBookingsList, loadBookingSuccess, resetSuccess, updateBooking, updateBookingFail, updateBookingSuccess } from "./booking.action";
import { bookingState } from "./booking.state";

export const _BookingReducer = createReducer(
  bookingState,
  on(resetSuccess, (state) => ({
    ...state,
    success: ''
  })),

  on(loadBookingsList, (state) => ({
    ...state,
    bookingLoading: true,
    errorMessage: '',
  })),
  on(loadBookingSuccess, (state, action) => ({
    ...state,
    bookings: action.bookings,
    bookingLoading: false,
  })),

  on(booking, (state, { booking }) => {
    const newBooking = [...state.bookings, booking]
    return {
      ...state,
      bookings: newBooking,
      bookingLoading: true,
    }
  }),
  on(bookingSuccess, (state, { booking }) => {
    console.log(state);
    return {
      ...state,
      bookingLoading: false,
      bookings: booking,
      success: "Booking success"
    }
  }),
  on(bookingFail, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    bookingLoading: false,
  })),

  on(updateBooking, (state) => ({
    ...state,
    bookingLoading: true,
  })),
  on(updateBookingSuccess, (state, { booking, success }) => ({
    ...state,
    bookingLoading: false,
    success: success,
    bookings: booking,
  })),
  on(updateBookingFail, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    bookingLoading: false,
  })),
  on(deleteBooking, (state, action) => ({
    ...state,
    bookingLoading: false,
  })),

  on(deleteBookingSuccess, (state, { bookings, success }) => ({
    ...state,
    bookingLoading: false,
    bookings: bookings,
    success: success
  })),

  on(deleteBookingFail, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    bookingLoading: false,
  })),
);
