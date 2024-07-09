import { createAction, props } from '@ngrx/store';
import { Restaurants } from '../../core/interfaces/restaurants';
import { BookingList } from '../../core/interfaces/booking';
import { ActionBooked } from '../../core/interfaces/confirmation';

export const LOAD_RESTAURANT = '[Restaurant] load Restaurant';
export const LOAD_RESTAURANT_SUCCESS = '[Restaurant] load Restaurant success';
export const LOAD_RESTAURANT_FAIL = '[Restaurant] load Restaurant fail';
export const LOAD_RESTAURANTSLOT='[Restaurant] load Restaurant slot';
export const LOAD_RESTAURANTSLOT_SUCCESS='[Restaurant] load RestaurantSlot Success';
export const LOAD_RESTAURANTSLOT_FAIL='[Restaurant] load RestaurantSlot Fail';

export const loadRestaurant = createAction(LOAD_RESTAURANT);
export const restaurantSucess = createAction(
  LOAD_RESTAURANT_SUCCESS,
  props<{ list: Restaurants[] }>()
);
export const restaurantFail = createAction(
  LOAD_RESTAURANT_FAIL,
  props<{ errorMessage: string }>()
);

export const LoadRestaurantSlot = createAction(LOAD_RESTAURANTSLOT);
export const restaurantSlotSuccess = createAction(
  LOAD_RESTAURANTSLOT_SUCCESS,
  props<{ list: Restaurants[] }>()
);
export const restaurantSlotFail = createAction(
  LOAD_RESTAURANTSLOT_FAIL,
  props<{ errorMessage: string }>()
);

export const bookRestaurantSlot = createAction(
  '[Booking] Book Restaurant Slot',
  props<ActionBooked>()
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
  '[Booking] Edit Booking',
  props<{ booking: BookingList}>()
);

export const deleteBooking = createAction(
  '[Booking] Delete Booking',
  props<{ id: number }>()
);