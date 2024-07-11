import { createReducer, on } from '@ngrx/store';
import { restaurantState } from './restaurants.state';
import {
  deleteBooking,
  editBooking,
  loadBooking,
  loadBookingSuccess,
  loadRestaurant,
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
  on(restaurantFail, (state, action) => (
    {
    ...state,
    errorMessage: action.errorMessage,
    isloading: false,
  })),
  on(editBooking, (state, action) => ({
    ...state,
     booking: action.booking,
    isloading: false,
  })),
  on(deleteBooking, (state, action) => ({
    ...state,
     booking: action.booking,
    isloading: false,
  })),
);



