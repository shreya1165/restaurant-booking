import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getrestaurantlist } from '../../store/restaurant/restaurants.selector';
import { bookRestaurantSlot } from '../../store/restaurant/restaurants.actions';
import { Restaurants } from '../../core/interfaces/restaurants';

interface Slot {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  Restaurantlist$: Observable<Restaurants[]> | undefined;
  selected: Date = new Date();
  selectedValue: string | undefined;
  numberOfPersons: string | undefined;
  selectedOption: string | undefined;
  restaurantName: string | undefined;

  slot: Slot[] = [
    { value: '9AM-12AM', viewValue: '9AM-12AM' },
    { value: '12PM-5PM', viewValue: '12PM-5PM' },
    { value: '5PM-10PM', viewValue: '5PM-10PM' },
  ];

  table: Slot[] = [
    { value: 'table for 2', viewValue: 'table for 2' },
    { value: 'table for 4', viewValue: 'table for 4' },
    { value: 'table for 6', viewValue: 'table for 6' },
    { value: 'table for 8', viewValue: 'table for 8' },
  ];

  bookingIdCounter: number = 1; // Initialize counter for booking IDs

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ restaurantList: Restaurants[] }>
  ) {}

  ngOnInit(): void {
    this.Restaurantlist$ = this.store.select(getrestaurantlist);

    // Subscribe to router params to get restaurant ID
    this.route.params.subscribe(params => {
      const restaurantId = params['id'];

      // Filter Restaurantlist$ based on restaurantId
      if (restaurantId && this.Restaurantlist$) {
        this.Restaurantlist$.subscribe(restaurants => {
          const restaurant = restaurants.find(r => r.id === restaurantId);
          if (restaurant) {
            this.restaurantName = restaurant.name;
          }
        });
      }
    });
  }

  booking() {
    if (this.selectedValue && this.selected && this.numberOfPersons && this.selectedOption && this.restaurantName) {
      // Generate a unique id for this booking
      const bookingId = this.bookingIdCounter++;

      // Generate a unique key for this booking
      const bookingKey = `booking-${bookingId}-${this.selected.toISOString()}-${this.selectedValue}-${this.selectedOption}`;

      const existingBooking = localStorage.getItem(bookingKey);

      if (existingBooking) {
        const parsedBooking = JSON.parse(existingBooking);
        if (parsedBooking.restaurantName === this.restaurantName && parsedBooking.slot === this.selectedValue && parsedBooking.option === this.selectedOption) {
          alert('Slot is already booked.');
          return;
        }
      }

      // If no existing booking or no matching slot and option, create a new booking
      console.log('Booking for:', this.selected.toISOString(), 'at', this.selectedValue, 'for', this.numberOfPersons, 'persons', 'with option', this.selectedOption, 'at restaurant', this.restaurantName);

      // Dispatch action to store in NgRx store
      this.store.dispatch(bookRestaurantSlot({
        id: bookingId,
        date: this.selected,
        slot: this.selectedValue,
        numberOfPersons: this.numberOfPersons,
        option: this.selectedOption,
        restaurantName: this.restaurantName
      }));

      // Store booking details in localStorage
      localStorage.setItem(bookingKey, JSON.stringify({
        id: bookingId,
        date: this.selected,
        slot: this.selectedValue,
        numberOfPersons: this.numberOfPersons,
        option: this.selectedOption,
        restaurantName: this.restaurantName
      }));

    }
  }
}
