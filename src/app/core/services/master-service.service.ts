import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookingList, Restaurants } from '../interfaces/restaurants';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class MasterServiceService {
  
  private readonly bookingKey = 'finalBooking';

  constructor(private http: HttpClient,private store: Store ) {}

  getAllRestaurants(): Observable<Restaurants[]> {
    return this.http.get<Restaurants[]>('http://localhost:3000/posts');
  }

  getAllBookings(): Observable<BookingList[]> {
    const bookingsString = localStorage.getItem(this.bookingKey);
    if (bookingsString) {
      try {
        const bookings: BookingList[] = JSON.parse(bookingsString);
        return of(bookings);
      } catch (error) {
        console.error('Error parsing bookings from localStorage:', error);
        return of([]);
      }
    } else {
      return of([]);
    }
  }

  bookRestaurantSlot(booking: BookingList): Observable<BookingList[]> {
    let bookingsString = localStorage.getItem(this.bookingKey);
    if (bookingsString) {
      try {
        let bookings: BookingList[] = JSON.parse(
           localStorage.getItem(this.bookingKey) || '[]'
          );
          bookings.push(booking);
          // localStorage.setItem(this.bookingKey, JSON.stringify(bookings));
          return of(bookings);
      } catch (error) {
        console.error('Error parsing bookings from localStorage:', error);
        return of([]);
      }
    } else {
      return of([]);
    }
  }
  // bookRestaurantSlot(booking: BookingList): Observable<BookingList[]> | null {
  //   // Assuming 'finalBooking' is the key for localStorage
  //   try {
  //     let bookings: BookingList[] = JSON.parse(
  //       localStorage.getItem(this.bookingKey) || '[]'
  //     );
  //     bookings.push(booking);
  //     localStorage.setItem(this.bookingKey, JSON.stringify(bookings));
  //     return of(bookings);
      
  //   } catch (error) {
  //     console.error('Error parsing bookings from localStorage:', error);
  //       return of([]);
  //   }
      
  //   // Dispatch action to NgRx store
  //   // this.store.dispatch(bookRestaurantSlot({ booking }));
  // }
  
}
