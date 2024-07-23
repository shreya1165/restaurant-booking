import { Action, createReducer, on } from "@ngrx/store";
import { loadRestaurants, loadRestaurantsFail, loadRestaurantsSucess } from "./restaurant.action";
import { restaurantState } from "./restaurant.state";
import { RestaurantModel } from "../../core/interfaces/restaurants";

export const _RestaurantReducer = createReducer(
    restaurantState,
    on(loadRestaurants, (state: any) => ({
      ...state,
      restaurantLoading: true,
      errorMessage: '',
    })),
    
    on(loadRestaurantsSucess, (state, action) => ({
        ...state,
        list: action.list,
        errorMessage: '',
        restaurantLoading: false,
      })),
      on(loadRestaurantsFail, (state, action) => ({
        ...state,
        errorMessage: action.errorMessage,
        restaurantLoading: false,
      })),
     
    );

    export function RestaurantReducer(state: RestaurantModel | undefined, action: Action<string>) {
        return _RestaurantReducer(state, action);
      }
      