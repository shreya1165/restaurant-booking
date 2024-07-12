import { Slot } from './booking';

export interface Restaurants {
  name: string;
  id: string;
  address: string;
  img: string;
  text: string;
  ratings: number;
  slots: Slot[];
  tables: number[];
}

export interface BookingList {
  restaurantId: string;
  id: number;
  restaurantName: string;
  option: string;
  slot: string;
  date: Date;
  numberOfPersons: string;
}

export interface RestaurantModel {
  list: Restaurants[];
  errorMessage: string;
  isloading: boolean;
  bookings: BookingList[];
}
