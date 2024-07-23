import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Restaurants } from '../../../core/interfaces/restaurants';
import { BookingList } from '../../../core/interfaces/booking';
import { bookingSpinner, getBookingList, getSuccessMessage } from '../../../store/booking-store/booking.selector';
import { getrestaurantlist } from '../../../store/restaurant-store/restaurant.selector';
import { booking, resetSuccess, updateBooking } from '../../../store/booking-store/booking.action';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {
  currentBooking: BookingList | undefined;
  bookingLoading: boolean | undefined;
  bookingForm: FormGroup;
  currentRestaurant: Restaurants | undefined;
  timeSlots: string[] = [];
  tableSize: String[] = [];
  bookingId: number | null;
  bookingsList: BookingList[] = [];
  subscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<any>, // Adjust type based on your actual store structure
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.bookingForm = this.formBuilder.group({
      numberOfPersons: ['', Validators.required],
      bookingDate: [new Date(), Validators.required],
      selectedSlot: ['', Validators.required],
      selectedPosition: ['', Validators.required],
    });
    this.bookingId = Number(this.route.snapshot.paramMap.get('bookingId')) || null;
  }

  ngOnInit(): void {
    this.store.select(bookingSpinner).subscribe((res) => {
      this.bookingLoading = res;
    });

    this.store.select(getrestaurantlist).subscribe((restaurants) => {
      if (restaurants.length) {
        const restaurantId: number = Number(this.route.snapshot.paramMap.get('id'));
        this.currentRestaurant = restaurants.find((r) => r.id === restaurantId);
        if (this.currentRestaurant) {
          this.tableSize = JSON.parse(this.currentRestaurant.tables); 
          this.timeSlots = JSON.parse(this.currentRestaurant.slots);
          this.bookingForm.patchValue({
            restaurantName: this.currentRestaurant.name,
          });
        }
      }
    });

    this.store.select(getBookingList).subscribe((bookings) => {
      this.bookingsList = bookings || [];
      if (bookings?.length && this.bookingId !== null) {
        this.currentBooking = bookings.find(
          (booking) => booking.id === this.bookingId
        );
        if (this.currentBooking) {
          this.bookingForm.patchValue({
            numberOfPersons: this.currentBooking.numberOfPersons,
            bookingDate: this.currentBooking.date,
            selectedSlot: this.currentBooking.slot,
            selectedPosition: this.currentBooking.option,
          });
        }
      }
    });

    this.checkSuccessStatus();
  }

  booking(): void {
    if (this.bookingForm.valid && this.currentRestaurant) {
      const { selectedSlot, bookingDate, numberOfPersons, selectedPosition } = this.bookingForm.value;

      const bookingData: BookingList = {
        id: this.currentBooking?.id || this.random(),
        date: bookingDate,
        slot: selectedSlot,
        numberOfPersons: numberOfPersons,
        option: selectedPosition,
        restaurantName: this.currentRestaurant.name,
        restaurantId: this.currentRestaurant.id,
      };

      if (this.currentBooking) {
        // Editing existing booking
        this.store.dispatch(
          updateBooking({
            bookings: bookingData,
            currentBookings: this.bookingsList,
          })
        );
      } else {
        // Creating new booking
        this.store.dispatch(
          booking({
            booking: bookingData
          })
        );
      }
    }
  }

  checkSuccessStatus(): void {
    this.subscription = this.store.pipe(select(getSuccessMessage)).subscribe((success) => {
      if (success?.trim()?.length) {
        if (this.currentBooking) {
          this._snackBar.open('Booking updated successfully!', undefined, {
            duration: 5000,
          });
          this.store.dispatch(resetSuccess());
        } else {
          this._snackBar.open('Slot booked successfully!', undefined, {
            duration: 5000,
          });
          this.store.dispatch(resetSuccess());
          this.router.navigateByUrl('/list');
        }
      }
    });
  }

  random(): number {
    return Math.round(Math.random() * 1000);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
