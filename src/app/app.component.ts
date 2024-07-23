import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadRestaurants } from './store/restaurant-store/restaurant.action';
import { loadBookingsList } from './store/booking-store/booking.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngrx';
  constructor(private store: Store) {
    this.store.dispatch(loadRestaurants());
    this.store.dispatch(loadBookingsList());
  }
}
