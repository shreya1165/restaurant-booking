import { Slot } from "./booking";


export interface Restaurants {
  bookings: any;
  name: string;
  id: string;
  address: string;
  img: string;
  text: string;
  ratings: number;
  slots:Slot[],
  tables:number[]
}

export interface BookingList {
  tableOption: string;
  rId:string,
  id: number;
  restaurantName: string;
  option: string;
  slot: string;
  date: Date;
  numberOfPersons: string;
  Persons: number;
  Restaurant: string;
}


export interface RestaurantModel {
  list: Restaurants[];
  errorMessage: string;
  isloading: boolean;
  bookings:BookingList[];
}

export interface BookingModel {
  Bookings: BookingList[];
  errorMessage: string;
  isloading: boolean;
}



