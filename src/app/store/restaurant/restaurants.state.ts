import { RestaurantModel } from '../../core/interfaces/restaurants';

export const restaurantState: RestaurantModel = {
  list: [],
  errorMessage: '',
  success:'',
  isloading: false,
  bookings: []
};
