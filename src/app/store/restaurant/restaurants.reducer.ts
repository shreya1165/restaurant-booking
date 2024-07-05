import { Action, createReducer, on } from "@ngrx/store";
import { restaurantState } from "./restaurants.state";
import { loadRestaurant, restaurantFail, restaurantSucess } from "./restaurants.actions";
import { BookingState } from "../../core/interfaces/booking";
import * as BookingActions from '../../store/restaurant/restaurants.actions';

const _RestaurantReducer = createReducer(restaurantState,
    on( loadRestaurant, (state)=>{
        return{
            ...state,
            isloading:true,
            errorMessage:''
        }
    }),
    on(restaurantSucess, (state, action) => {
        return {
            ...state,
            list: action.list,
            errorMessage: '',
            isloading:false
        }
    }),

    on(restaurantFail, (state, action) => {
        return {
            ...state,
            list: [],
            errorMessage: action.errorMessage,
            isloading:false
        }
    }),

)

export function RestaurantReducer(state: any, action: Action) {
    return _RestaurantReducer(state, action)
}


export const initialState: BookingState = {
    bookedSlot: {
      date: null,
      slot: null
    }
  };

const _bookingReducer = createReducer(
    initialState,
    on(BookingActions.bookRestaurantSlot, (state, { date, slot }) => ({
      ...state,
      bookedSlot: { date, slot }
    }))
  );
  
  export function bookingReducer(state: BookingState | undefined, action: Action) {
    return _bookingReducer(state, action);
  }