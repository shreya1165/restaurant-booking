import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBooking, loadRestaurant } from './store/restaurant/restaurants.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngrx';
  constructor(private store :Store){
    this.store.dispatch(loadRestaurant());
    this.store.dispatch(loadBooking());
  }
}
