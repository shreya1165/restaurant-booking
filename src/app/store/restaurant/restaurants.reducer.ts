import { createReducer, on } from '@ngrx/store';
import { restaurantState } from './restaurants.state'; // Assuming you export these interfaces from './restaurants.state'
import {
  bookRestaurantSlot,
  bookRestaurantSlotFail,
  bookRestaurantSlotSuccess,
  deleteBooking,
  deleteBookingFail,
  deleteBookingSuccess,
  editBooking,
  editBookingFail,
  editBookingSuccess,
  loadBooking,
  loadBookingSuccess,
  loadRestaurant,
  resetSucess,
  restaurantFail,
  restaurantSucess,
} from './restaurants.actions';

export const _RestaurantReducer = createReducer(
  restaurantState,
  on(loadRestaurant, (state) => ({
    ...state,
    isloading: true,
    errorMessage: '',
  })),
  on(resetSucess, (state) => ({
    ...state,
    success:''
  })),
  on(restaurantSucess, (state, action) => ({
    ...state,
    list: action.list,
    errorMessage: '',
    isloading: false,
  })),
  on(restaurantFail, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    isloading: false,
  })),
  on(loadBooking, (state) => ({
    ...state,
    isloading: true,
    errorMessage: '',
  })),
  on(loadBookingSuccess, (state, action) => ({
    ...state,
    bookings: action.bookings,
    isloading: false,
  })),
  on(bookRestaurantSlot, (state, action) => ({
    ...state,
    isloading: true,
  })),
  on(bookRestaurantSlotSuccess, (state, { bookings, success }) => ({
    ...state,
    isloading: false,
    bookings: bookings,
    success: success
  })),
  on(bookRestaurantSlotFail, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    isloading: false,
  })),
  on(editBooking, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(editBookingSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    success: action.success,
    bookings: action.booking, 
  })),
  on(editBookingFail, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    isLoading: false,
  })),
  on(deleteBooking, (state, action) => ({
    ...state,
    isloading: false,
  })),

  on(deleteBookingSuccess, (state, { bookings, success }) => ({
    ...state,
    isloading: false,
    bookings: bookings,
    success: success
  })),

  on(deleteBookingFail, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    isloading: false,
  })),

);
