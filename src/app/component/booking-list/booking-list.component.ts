import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookingList } from '../../core/interfaces/booking';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: BookingList[] = [];
  dataSource: MatTableDataSource<BookingList>; // Remove '!' from dataSource declaration

  displayedColumns: string[] = ['date', 'slot', 'numberOfPersons', 'option', 'restaurantName', 'actions'];

  constructor(private datePipe: DatePipe) {
    this.dataSource = new MatTableDataSource<BookingList>([]); // Initialize dataSource here
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookings = Object.keys(localStorage)
      .filter(key => key.startsWith('booking-'))
      .map(key => {
        const booking = JSON.parse(localStorage.getItem(key)!);
        // Assigning a unique id based on the key (if it doesn't exist)
        if (!booking.id) {
          const id = key.split('-')[1]; // Extract the id from the localStorage key
          booking.id = parseInt(id); // Convert id to number if necessary
        }
        return booking as BookingList; // Cast booking as BookingList
      });

    // Format date field in each booking
    this.bookings.forEach(booking => {
      booking.date = this.datePipe.transform(booking.date, 'dd-MM-yyyy')!;
    });

    this.dataSource.data = this.bookings; // Update MatTableDataSource
  }

  editBooking(booking: BookingList) {
    // Implement edit logic (e.g., navigate to edit form)
    console.log('Edit:', booking);
  }

  deleteBooking(booking: BookingList) {
    // Remove from localStorage
    localStorage.removeItem(`booking-${booking.id}`);

    // Remove from displayed list
    this.bookings = this.bookings.filter(b => b.id !== booking.id);
    this.dataSource.data = this.bookings;
  }
}
