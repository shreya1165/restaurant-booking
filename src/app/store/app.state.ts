import { _BookingReducer } from "./booking-store/booking.reducer";
import { BOOKING_STATE_NAME } from "./booking-store/booking.selector";
import { RestaurantReducer } from "./restaurant-store/restaurant.reducer";
import { RESTAURANT_STATE_NAME } from "./restaurant-store/restaurant.selector";
import { BookingList } from "../core/interfaces/booking";
import { Restaurants } from "../core/interfaces/restaurants";


export interface AppState {
    [RESTAURANT_STATE_NAME]: Restaurants;
    [BOOKING_STATE_NAME]: BookingList;
}

export const appReducer = {
    [RESTAURANT_STATE_NAME]: RestaurantReducer,
    [BOOKING_STATE_NAME]: _BookingReducer,
};
