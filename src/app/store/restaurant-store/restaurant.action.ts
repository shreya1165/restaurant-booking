import { createAction, props } from "@ngrx/store";
import { Restaurants } from "../../core/interfaces/restaurants";

export const LOAD_RESTAURANTS = '[Restaurant] load Restaurant';
export const LOAD_RESTAURANTS_SUCCESS = '[Restaurant] load Restaurant success';
export const LOAD_RESTAURANTS_FAIL = '[Restaurant] load Restaurant fail';

export const loadRestaurants = createAction(LOAD_RESTAURANTS);
export const loadRestaurantsSucess = createAction(
    LOAD_RESTAURANTS_SUCCESS,
    props<{ list: Restaurants[] }>()
  );
  export const loadRestaurantsFail = createAction(
    LOAD_RESTAURANTS_FAIL,
    props<{ errorMessage: string }>()
  );
 