


export interface BookingList {
  restaurantId: number;
  id: number;
  restaurantName: string;
  option: string;
  slot: string;
  date: Date;
  numberOfPersons: string;
}
export interface BookingModel {
  success:string | null;
  errorMessage: string | null;
  bookings: BookingList[];
  bookingLoading:boolean
}