import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { getBookingList } from '../../../store/booking-store/booking.selector';
import { deleteBooking } from '../../../store/booking-store/booking.action';
import { BookingList } from '../../../core/interfaces/booking';

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
    this.store.select(getBookingList).subscribe((bookings) => {
      this.bookings = bookings;
      this.dataSource = new MatTableDataSource(bookings);
    });
  }

  editBooking(booking: BookingList):void {
    // Assuming you want to navigate to the edit form with parameters
    this.router.navigate(['/edit', booking.restaurantId, booking.id]);
  }

  deleteBooking(booking: BookingList): void {
    // Dispatch the deleteBooking action
    this.store.dispatch(deleteBooking({ booking, currentBookings: this.bookings }));
  }
}
