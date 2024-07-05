export interface Restaurants {
  name: string;
  id: number;
  address: string;
  img: string;
  text: string;
  ratings: number;
}

export interface RestaurantModel {
  list: Restaurants[];
  errorMessage: string;
  isloading: boolean;
}
