import { createAction, props } from '@ngrx/store';
import { Restaurants } from '../../core/interfaces/restaurants';

export const LOAD_RESTAURANT = '[Restaurant] load Restaurant';
export const LOAD_RESTAURANT_SUCCESS = '[Restaurant] load Restaurant success';
export const LOAD_RESTAURANT_FAIL = '[Restaurant] load Restaurant fail';

export const loadRestaurant = createAction(LOAD_RESTAURANT);
export const restaurantSucess = createAction(
  LOAD_RESTAURANT_SUCCESS,
  props<{ list: Restaurants[] }>()
);
export const restaurantFail = createAction(
  LOAD_RESTAURANT_FAIL,
  props<{ errorMessage: string }>()
);

export const bookRestaurantSlot = createAction(
  '[Booking] Book Restaurant Slot',
  props<{
    id: number;
    date: Date;
    slot: string;
    numberOfPersons: string;
    option: string;
    restaurantName: string;
  }>()
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
