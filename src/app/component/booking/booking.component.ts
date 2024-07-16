import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BookingList, Restaurants } from '../../core/interfaces/restaurants';
import {
  bookRestaurantSlot,
  bookRestaurantSlotSuccess,
  editBooking,
  editBookingSuccess,
  resetSucess,
} from '../../store/restaurant/restaurants.actions';
import { getBookingList, getrestaurantlist, getspinnerstate, getSuccessMessage } from '../../store/restaurant/restaurants.selector';
import { Slot } from '../../core/interfaces/booking';
import { MasterServiceService } from '../../core/services/master-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  initialBooking: BookingList | undefined;
  isloading: boolean | undefined;
  bookingForm: FormGroup;
  currentRestaurant: Restaurants | undefined;
  slots: Slot[] = [];
  tables: number[] = [];
  bookingId: number | null;
  bookingsList!: BookingList[];
  sub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<{ restaurantList: Restaurants[] }>,
    private _snackBar: MatSnackBar,
    private router: Router,
    private masterService: MasterServiceService
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
    this.store.select(getspinnerstate).subscribe((res) => {
      this.isloading = res;
    });

    this.store.select(getrestaurantlist).subscribe((restaurants) => {
      if (restaurants.length) {
        const restaurantId = this.route.snapshot.paramMap.get('id');
        this.currentRestaurant = restaurants.find(
          (r) => r.id === restaurantId
        );
        if (this.currentRestaurant) {
          this.tables = this.currentRestaurant.tables;
          this.slots = this.currentRestaurant.slots;
          this.bookingForm.patchValue({
            restaurantName: this.currentRestaurant.name,
          });
        }
      }
    });


    this.store.select(getBookingList).subscribe((bookings) => {
      this.bookingsList = [...bookings || []];
      if (bookings?.length && this.bookingId !== null) {
        this.initialBooking = bookings.find((booking) => booking.id === this.bookingId);
        if (this.initialBooking) {
          this.bookingForm.patchValue({
            numberOfPersons: this.initialBooking.numberOfPersons,
            bookingDate: this.initialBooking.date,
            selectedSlot: this.initialBooking.slot,
            selectedPosition: this.initialBooking.option,
          });
        }
      }
    });

    this.checkSuccessStatus();
    
  }
  

  booking(): void {
    if (this.bookingForm.valid && this.currentRestaurant) {
      const { selectedSlot, bookingDate, numberOfPersons, selectedPosition } =
        this.bookingForm.value;

      const bookingData: BookingList = {
        id: this.initialBooking?.id || this.random(),
        date: bookingDate,
        slot: selectedSlot,
        numberOfPersons: numberOfPersons,
        option: selectedPosition,
        restaurantName: this.currentRestaurant.name,
        restaurantId: this.currentRestaurant.id,
      };

      if (this.initialBooking) {
        // Editing existing booking
        this.store.dispatch(editBooking({
          bookings: bookingData,
          currentBookings: this.bookingsList
        }));

      } else {
        // Creating new booking
        this.store.dispatch(bookRestaurantSlot({
          booking: bookingData,
          currentBookings: this.bookingsList
        }));

      }
    }
  }

  checkSuccessStatus(): void {
   this.sub = <Subscription>this.store.pipe(select(getSuccessMessage)).subscribe((success) => {
      if (success?.trim()?.length) {
        if (this.initialBooking) {
          this._snackBar.open('Booking updated successfully!', undefined, {
            duration: 5000,
          });
          this.store.dispatch(resetSucess());
        } else {
          this._snackBar.open('Slot booked successfully!', undefined, {
            duration: 5000,
          });
          this.store.dispatch(resetSucess());
          this.router.navigateByUrl('/list');
        }
      }
    });
  }
  

  random(): number {
    return Math.round(Math.random() * 1000);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
