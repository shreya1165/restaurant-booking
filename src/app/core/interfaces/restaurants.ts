export interface Restaurants {
  name: string;
  id: number;
  address: string;
  img: string;
  text: string;
  ratings: number;
  slots: string;
  tables: string;
}

export interface RestaurantModel {
  list: Restaurants[];
  errorMessage: string;
  restaurantLoading:boolean
}


