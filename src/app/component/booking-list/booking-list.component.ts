import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { deleteBooking, editBooking, loadBooking } from '../../store/restaurant/restaurants.actions';
import { BookingList, Restaurants } from '../../core/interfaces/restaurants';
import { getBookingList, getrestaurantlist } from '../../store/restaurant/restaurants.selector';
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

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<BookingList>();
  }

  ngOnInit(): void {
    this.store.dispatch(loadBooking());
    this.store.select(getBookingList).subscribe((bookings) => {
      this.bookings = bookings;
      this.dataSource = new MatTableDataSource(bookings);
    });
  }
  

  // loadBookingsFromLocalStorage() {
  //   const keys = Object.keys(localStorage);

  //   this.bookings = keys
  //     .map((key) => {
  //       const bookingString = localStorage.getItem(key);
  //       if (bookingString) {
  //         try {
  //           const booking = JSON.parse(bookingString) as BookingList;
  //           if (!booking.id) {
  //             const id = key.split('-')[1];
  //             booking.id = parseInt(id, 10);
  //           }
  //           return booking;
  //         } catch (error) {
  //           console.error('Error parsing booking:', error);
  //           return null;
  //         }
  //       }
  //       return null;
  //     })
  //     .filter((booking) => !!booking) as BookingList[];

  //   this.dataSource.data = this.bookings;
  // }


  
  editBooking(booking: BookingList) {
    // Assuming you want to navigate to the edit form with parameters
    this.router.navigate(['/edit', booking.rId, booking.id]);
  }
  
  
  deleteBooking(booking: BookingList) {
  
    this.bookings = this.bookings.filter((b) => b.id !== booking.id);

    this.dataSource.data = this.bookings;

    this.store.dispatch(deleteBooking({ booking }));
 
    let localStorageBookings: BookingList[] = JSON.parse(localStorage.getItem('finalBooking') || '[]');
    localStorageBookings = localStorageBookings.filter((b) => b.id !== booking.id);
    localStorage.setItem('finalBooking', JSON.stringify(localStorageBookings));
    
  }
  
  updateLocalStorage(updatedBooking?: BookingList) {

    let bookings: BookingList[] = JSON.parse(localStorage.getItem('finalBooking') || '[]');
  
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
