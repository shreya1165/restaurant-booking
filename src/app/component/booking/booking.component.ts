import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getrestaurantlist } from '../../store/restaurant/restaurants.selector';
import { bookRestaurantSlot } from '../../store/restaurant/restaurants.actions';
import { Restaurants } from '../../core/interfaces/restaurants';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Slot {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
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

  static bookingIdCounter: number = 1;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ restaurantList: Restaurants[] }>,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit(): void {
    this.Restaurantlist$ = this.store.select(getrestaurantlist);

    this.route.params.subscribe((params) => {
      const restaurantId = params['id'];

      if (restaurantId && this.Restaurantlist$) {
        this.Restaurantlist$.subscribe((restaurants) => {
          const restaurant = restaurants.find((r) => r.id === restaurantId);
          if (restaurant) {
            this.restaurantName = restaurant.name;
          }
        });
      }
    });
  }

  booking() {
    if (
      this.selectedValue &&
      this.selected &&
      this.numberOfPersons &&
      this.selectedOption &&
      this.restaurantName
    ) {
      const bookingKey = `${
        this.restaurantName
      }-${this.selected.toISOString()}-${this.selectedValue}-${
        this.selectedOption
      }`;

      const existingBooking = localStorage.getItem(bookingKey);

      if (existingBooking) {
        alert('Slot is already booked.');
        return;
      }
      const bookingId = BookingComponent.bookingIdCounter++;

      this.store.dispatch(
        bookRestaurantSlot({
          id: bookingId,
          date: this.selected,
          slot: this.selectedValue,
          numberOfPersons: this.numberOfPersons,
          option: this.selectedOption,
          restaurantName: this.restaurantName,
        })
      );

      localStorage.setItem(
        bookingKey,
        JSON.stringify({
          id: bookingId,
          date: this.selected,
          slot: this.selectedValue,
          numberOfPersons: this.numberOfPersons,
          option: this.selectedOption,
          restaurantName: this.restaurantName,
        })
      );

      let snackBarRef = this._snackBar.open(
        'Booking successful!',
        'Go to Home',
        {
          duration: 5000,
        }
      );

      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/restaurants']);
      });
    }
  }
}
