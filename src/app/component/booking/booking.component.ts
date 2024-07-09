import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getrestaurantlist } from '../../store/restaurant/restaurants.selector';
import { bookRestaurantSlot } from '../../store/restaurant/restaurants.actions';
import { Restaurants } from '../../core/interfaces/restaurants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { Slot } from '../../core/interfaces/booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  Restaurantlist$!: Observable<Restaurants[]>;
  restaurantName: string | undefined;
  bookingIdCounter: number = 1; // Instance-specific booking ID counter
  bookingForm: any;
  bookingId: number = 0; // Booking ID for storing the generated booking ID

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<{ restaurantList: Restaurants[] }>,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.bookingForm = this.formBuilder.group({
      numberOfPersons: ['', Validators.required],
      selected: [new Date(), Validators.required],
      selectedValue: ['', Validators.required],
      selectedOption: ['', Validators.required],
      restaurantName: ['']
    });
  }

  openSnackBar(message: string, action: string): void {
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

  booking(): void {
    if (this.bookingForm.valid) {
      const { selectedValue, selected, numberOfPersons, selectedOption } = this.bookingForm.value;
      const persons: string = numberOfPersons || '';
      const option: string = selectedOption || '';
      const bookingKey = `${this.restaurantName}-${selected.toISOString()}-${selectedValue}-${option}`;
      const existingBooking = localStorage.getItem(bookingKey);

      if (existingBooking) {
        alert('Slot is already booked.');
        return;
      }
      const bookingId = this.bookingIdCounter++;

      this.bookingId = bookingId; // Store the booking ID

      this.store.dispatch(
        bookRestaurantSlot({
          id: bookingId,
          date: selected,
          slot: selectedValue,
          numberOfPersons: persons,
          option: option,
          restaurantName: this.restaurantName || '',
        })
      );

      localStorage.setItem(
        bookingKey,
        JSON.stringify({
          id: bookingId,
          date: selected,
          slot: selectedValue,
          numberOfPersons: persons,
          option: option,
          restaurantName: this.restaurantName || '',
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
