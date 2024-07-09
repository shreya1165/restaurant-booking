import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookingList } from '../../core/interfaces/booking';
import { MatTableDataSource } from '@angular/material/table';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import {
  deleteBooking,
  editBooking,
} from '../../store/restaurant/restaurants.actions';
import { Store } from '@ngrx/store';

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

  constructor(
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private store: Store
  ) {
    this.dataSource = new MatTableDataSource<BookingList>();
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    // Load bookings from localStorage or wherever they are stored
    const keys = Object.keys(localStorage);

    this.bookings = keys
      .map((key) => {
        const bookingString = localStorage.getItem(key);
        if (bookingString) {
          try {
            const booking = JSON.parse(bookingString) as BookingList;
            // Additional processing if needed
            if (!booking.id) {
              const id = key.split('-')[1];
              booking.id = parseInt(id, 10);
            }
            return booking;
          } catch (error) {
            console.error('Error parsing booking:', error);
            return null;
          }
        }
        return null;
      })
      .filter((booking) => !!booking) as BookingList[];

    this.dataSource.data = this.bookings;
  }

  editBooking(booking: BookingList) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      data: { booking },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Remove the previous entry from localStorage
        const localStorageKey = `booking-${result.id}`;
        localStorage.removeItem(localStorageKey);
  
        // Update the booking in localStorage with the new data
        localStorage.setItem(localStorageKey, JSON.stringify(result));
  
        // Find the index of the edited booking in the array
        const index = this.bookings.findIndex((b) => b.id === result.id);
        if (index !== -1) {
          // Update the booking in the array
          this.bookings[index] = result;
  
          // Dispatch the editBooking action to update in NgRx store
          this.store.dispatch(editBooking({ booking: result }));
  
          // Refresh the MatTableDataSource
          this.dataSource.data = [...this.bookings];
        }
      }
    });
  }
  

  deleteBooking(booking: BookingList) {
    // Remove from localStorage
    localStorage.removeItem(`booking-${booking.id}`);

    // Remove from displayed list (this.bookings)
    this.bookings = this.bookings.filter((b) => b.id !== booking.id);

    this.store.dispatch(deleteBooking({ id: booking.id }));

    // Update MatTableDataSource
    this.dataSource.data = this.bookings;

    // Update localStorage after deletion
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    // Clear the localStorage
    localStorage.clear();

    // Store all remaining bookings back to localStorage
    this.bookings.forEach((booking) => {
      localStorage.setItem(`booking-${booking.id}`, JSON.stringify(booking));
    });
  }
}