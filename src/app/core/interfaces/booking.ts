export interface Slot {
  value: string;
  viewValue: string;
}

export interface Booking {
  id: number;
  date: Date;
  slot: string;
  numberOfPersons: string;
  option: string;
  restaurantName: string;
}
