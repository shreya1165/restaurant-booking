import { createAction, props } from '@ngrx/store';
import { BookingList, Restaurants } from '../../core/interfaces/restaurants';

export const LOAD_RESTAURANT = '[Restaurant] load Restaurant';
export const LOAD_RESTAURANT_SUCCESS = '[Restaurant] load Restaurant success';
export const LOAD_RESTAURANT_FAIL = '[Restaurant] load Restaurant fail';
export const LOADBOOKING = '[booking] load booking';
export const LOADBOOKING_SUCCESS = '[booking] load booking success';
export const LOADBOOKING_FAIL = '[booking] load booking fail';

export const loadRestaurant = createAction(LOAD_RESTAURANT);
export const restaurantSucess = createAction(
  LOAD_RESTAURANT_SUCCESS,
  props<{ list: Restaurants[] }>()
);
export const restaurantFail = createAction(
  LOAD_RESTAURANT_FAIL,
  props<{ errorMessage: string }>()
);

export const loadBooking = createAction(LOADBOOKING);
export const loadBookingSuccess = createAction(
  '[Booking] Load Booking Success',
  props<{ bookings: BookingList[] }>()
);
export const loadBookingFail = createAction(
  LOADBOOKING_FAIL,
  props<{ errorMessage: string }>()
);

export const bookRestaurantSlot = createAction(
  '[Booking] Book Restaurant Slot',
  props<{ booking: BookingList }>()
);

export const bookRestaurantSlotFail = createAction(
  '[Booking] Book Restaurant Slot Fail',
  props<{ errorMessage: string }>()
);

export const updateDetails = createAction(
  '[Update] UpdateDetails',
  props<{
    id: number;
    date: Date;
    slot: string;
    numberOfPersons: string;
    option: string;
    restaurantName: string;
  }>()
);

export const editBooking = createAction(
  '[Booking] edit booking',
  props<{ booking: BookingList }>()
);

export const editBookingFail = createAction(
  '[Booking] Edit Booking Fail',
  props<{ errorMessage: string  }>()
);

export const deleteBooking = createAction(
  '[Booking] delete booking',
  props<{ booking: BookingList }>()
);
