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
      // Generate a unique key for this booking
      const bookingKey = `${this.restaurantName}-${this.selected.toISOString()}-${this.selectedValue}-${this.selectedOption}`;
  
      // Check if there's already a booking with the same details in localStorage
      const existingBooking = localStorage.getItem(bookingKey);
  
      if (existingBooking) {
        alert('Slot is already booked.');
        return;
      }
  
      // Generate a unique id for this booking
      const bookingId = this.bookingIdCounter++;
  
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
  
      // Optionally, you can clear the form fields after successful booking
      this.selectedValue = undefined;
      this.numberOfPersons = undefined;
      this.selectedOption = undefined;
    }
  }
}  