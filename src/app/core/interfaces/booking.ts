export interface BookingState {
  bookedSlot: {
    date: Date | null;
    slot: string | null;
  };
}

export interface BookingList {
  id: number;
  restaurantName: string;
  option: string;
  slot: string;
  date: string;
  numberOfPersons: string;
  Persons: number;
  Restaurant: string;
}
