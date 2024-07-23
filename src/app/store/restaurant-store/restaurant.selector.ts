import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RestaurantModel } from '../../core/interfaces/restaurants';

export const RESTAURANT_STATE_NAME = 'restaurant';
const selectRestaurantState = createFeatureSelector<RestaurantModel>(
    RESTAURANT_STATE_NAME
);

export const getrestaurantlist = createSelector(
    selectRestaurantState,
    (state: RestaurantModel) => state.list
);

export const restaurantSpinner = createSelector(
    selectRestaurantState,
    (state: RestaurantModel) => state.restaurantLoading
);
