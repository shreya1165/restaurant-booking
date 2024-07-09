import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RestaurantModel } from '../../core/interfaces/restaurants';

export const selectRestaurantState =
  createFeatureSelector<RestaurantModel>('rb');

export const getrestaurantlist = createSelector(
  selectRestaurantState,
  (state: RestaurantModel) => state.list
);

export const getspinnerstate = createSelector(
  selectRestaurantState,
  (state: RestaurantModel) => state.isloading
);
