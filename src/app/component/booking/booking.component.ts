import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookingList, Restaurants } from '../../core/interfaces/restaurants';
import {
  bookRestaurantSlot,
  bookRestaurantSlotFail,
  editBooking,
} from '../../store/restaurant/restaurants.actions';
import { getrestaurantlist, getspinnerstate } from '../../store/restaurant/restaurants.selector';
import { Slot } from '../../core/interfaces/booking';
import { MasterServiceService } from '../../core/services/master-service.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  @Input() initialBooking!: BookingList;
  isloading: boolean | undefined;
  bookingForm: FormGroup;
  currentRestaurant!: Restaurants;
  slots: Slot[] = [];
  tables: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<{ restaurantList: Restaurants[] }>,
    private _snackBar: MatSnackBar,
    private router: Router,
    private masterService:MasterServiceService
  ) {
    this.bookingForm = this.formBuilder.group({
      numberOfPersons: ['', Validators.required],
      bookingDate: [new Date(), Validators.required],
      selectedSlot: ['', Validators.required],
      selectedPosition: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.select(getspinnerstate).subscribe((res) => {
      this.isloading = res;
    });
    // Fetch restaurants and find the selected one
    this.store.select(getrestaurantlist).subscribe((restaurants) => {
      if (restaurants.length) {
        const restaurantId: string | null =
          this.route.snapshot.paramMap.get('id') || null;
        const bId = this.route.snapshot.paramMap.get('bookingId') || null;
        const restaurant = restaurants.find(
          (r) => r.id === String(restaurantId)
        );
        if (restaurant) {
          this.currentRestaurant = restaurant;
          this.tables = this.currentRestaurant.tables;
          this.slots = this.currentRestaurant.slots;
          this.bookingForm.patchValue({
            restaurantName: this.currentRestaurant.name,
          });
        }

        // If bId is provided, load the initial booking details for editing
        if (bId) {
          const initialBooking = this.getBookingFromLocalStorage(Number(bId));
          if (initialBooking) {
            this.initialBooking = initialBooking;
            this.bookingForm.patchValue({
              numberOfPersons: this.initialBooking.numberOfPersons,
              bookingDate: this.initialBooking.date,
              selectedSlot: this.initialBooking.slot,
              selectedPosition: this.initialBooking.option,
            });
          }
        }
      }
    });
  }
  getBookingFromLocalStorage(id: number): BookingList | undefined {
    const bookings: BookingList[] = JSON.parse(
      localStorage.getItem('finalBooking') || '[]'
    );
    return bookings.find((booking) => booking.id === id);
  }

  random(): number {
    const num = Math.random() * 1000;
    const round = Math.round(num);
    return round;
  }
  booking(): void {
    if (this.bookingForm.valid) {
      const { selectedSlot, bookingDate, numberOfPersons, selectedPosition } =
        this.bookingForm.value;

      let booking: BookingList;

      if (this.initialBooking) {
        // Editing existing booking
        booking = {
          ...this.initialBooking,
          date: bookingDate,
          slot: selectedSlot,
          numberOfPersons: numberOfPersons,
          option: selectedPosition,
        };

        // Update local storage with edited booking
        this.updateLocalStorage(booking);

        // Dispatch action to update booking
        this.store.dispatch(editBooking({ booking }));

        // Display success message
        this._snackBar.open('Booking updated!', 'Go to Home', {
          duration: 5000,
        });

        // Navigate to list after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/list']);
        }, 2000);
      } else {
        // Creating new booking
        booking = {
          id: this.random(),
          date: bookingDate,
          slot: selectedSlot,
          numberOfPersons: numberOfPersons,
          option: selectedPosition,
          restaurantName: this.currentRestaurant.name,
          restaurantId: this.currentRestaurant?.id,
        };

        // Dispatch action to book restaurant slot
        this.masterService.bookRestaurantSlot(booking);
        // Update local storage with new booking
        let bookings: BookingList[] = JSON.parse(
          localStorage.getItem('finalBooking') || '[]'
        );
        bookings.push(booking);
        localStorage.setItem('finalBooking', JSON.stringify(bookings));

        // Display success message
        this._snackBar.open('Booking successful!', 'Thank you', {
          duration: 5000,
        });

        // Navigate to list after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/list']);
        }, 2000);
      }
    } else {
      this.store.dispatch(bookRestaurantSlotFail({ errorMessage: 'error' }));
      // Handle form validation errors
      this._snackBar.open('Error occurred, please try again.', 'Close', {
        duration: 3000,
      });
    }
  }

  updateLocalStorage(booking: BookingList) :void{
    let bookings: BookingList[] = JSON.parse(
      localStorage.getItem('finalBooking') || '[]'
    );

    // Find the index of the booking to update
    const index = bookings.findIndex((b) => b.id === booking.id);
    
    if (index !== -1) {
      // Update the booking in the array
      bookings[index] = booking;

      // Update the local storage
      localStorage.setItem('finalBooking', JSON.stringify(bookings));
    } else {
      console.error('Booking not found in local storage:', booking);
    }
  }
}
