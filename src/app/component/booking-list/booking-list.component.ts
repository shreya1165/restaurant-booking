import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import {
  deleteBooking,
  loadBooking,
} from '../../store/restaurant/restaurants.actions';
import { BookingList } from '../../core/interfaces/restaurants';
import {
  getBookingList,
} from '../../store/restaurant/restaurants.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  bookings: BookingList[] = [];
  displayedColumns: string[] = [
    'date',
    'slot',
    'numberOfPersons',
    'option',
    'restaurantName',
    'actions',
  ];

  dataSource: MatTableDataSource<BookingList>;

  constructor(private store: Store, private router: Router) {
    this.dataSource = new MatTableDataSource<BookingList>();
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooking());
    this.store.select(getBookingList).subscribe((bookings) => {
      this.bookings = bookings;
      this.dataSource = new MatTableDataSource(bookings);
    });
  }

  editBooking(booking: BookingList):void {
    // Assuming you want to navigate to the edit form with parameters
    this.router.navigate(['/edit', booking.restaurantId, booking.id]);
  }

  deleteBooking(booking: BookingList):void {
    this.bookings = this.bookings.filter((b) => b.id !== booking.id);

    this.dataSource.data = this.bookings;

    this.store.dispatch(deleteBooking({ booking }));

    let localStorageBookings: BookingList[] = JSON.parse(
      localStorage.getItem('finalBooking') || '[]'
    );
    localStorageBookings = localStorageBookings.filter(
      (b) => b.id !== booking.id
    );
    localStorage.setItem('finalBooking', JSON.stringify(localStorageBookings));
  }

  updateLocalStorage(updatedBooking?: BookingList):void {
    let bookings: BookingList[] = JSON.parse(
      localStorage.getItem('finalBooking') || '[]'
    );

    this.bookings.forEach((booking) => {
      const index = bookings.findIndex((b) => b.id === booking.id);
      if (index !== -1) {
        bookings[index] = booking;
      } else {
        bookings.push(booking);
      }
    });

    localStorage.setItem('finalBooking', JSON.stringify(bookings));
  }
}
