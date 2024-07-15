import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RestaurantModel } from '../../core/interfaces/restaurants';

export const selectRestaurantState = createFeatureSelector<RestaurantModel>('rb');

export const getrestaurantlist = createSelector(
  selectRestaurantState,
  (state: RestaurantModel) => state.list
);

export const getBookingList = createSelector(
  selectRestaurantState,
  (state: RestaurantModel) => state.bookings
);

export const getspinnerstate = createSelector(
  selectRestaurantState,
  (state: RestaurantModel) => state.isloading
);

export const getErrorMessage = createSelector(
  selectRestaurantState,
  (state: RestaurantModel) => state.errorMessage
);
