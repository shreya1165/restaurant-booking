export interface BookingState {
  bookedSlot: {
    date: Date | null;
    slot: string | null;
  };
}

export interface BookingList {
  tableOption: string;
  id: number;
  restaurantName: string;
  option: string;
  slot: string;
  date: Date;
  numberOfPersons: string;
  Persons: number;
  Restaurant: string;
}

export interface Slot {
  value: string;
  viewValue: string;
}