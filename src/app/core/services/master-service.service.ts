import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookingList, Restaurants } from '../interfaces/restaurants';

@Injectable({
  providedIn: 'root',
})
export class MasterServiceService {
  private readonly bookingKey = 'finalBooking';

  constructor(private http: HttpClient) {}

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
}
