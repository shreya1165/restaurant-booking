
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { Restaurants } from '../interfaces/restaurants';
import { BookingList } from '../interfaces/booking';

@Injectable({
  providedIn: 'root',
})
export class MasterServiceService {
  private readonly bookingKey = 'finalBooking';
  private readonly backendUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<Restaurants[]> {
    return this.http.get<Restaurants[]>(`${this.backendUrl}/restaurants`).pipe(
      catchError((error) => {
        console.error('Error fetching restaurants from backend:', error);
        return of([]); // Changed from an empty array to avoid type mismatch
      })
    );
  }

  getAllBookings(): Observable<BookingList[]> {
    return this.http.get<BookingList[]>(`${this.backendUrl}/bookings`).pipe(
      catchError((error) => {
        console.error('Error fetching bookings from backend:', error);
        return of([]); 
      })
    );
  }

  bookRestaurantSlot(newBooking: BookingList): Observable<BookingList[]> {
    try {
      const t = this.http.post<BookingList[]>(`${this.backendUrl}/bookings`,newBooking)
      // const updatedBookingsList = [...bookings, newBooking];
      //  localStorage.setItem(this.bookingKey, JSON.stringify(updatedBookingsList));
      // return of(updatedBookingsList); 
      console.log(t);
      return t;
      } catch (error) {
        console.error('Error parsing bookings from localStorage:', error);
        return of([]);
      }
    }

  deleteSlot(bookingToDelete: BookingList, currentBookings: BookingList[]): Observable<BookingList[]> {
    const url = `${this.backendUrl}/bookings/${bookingToDelete.id}`;
    return this.http.delete(url).pipe(
      switchMap(() => {
        const updatedBookings = currentBookings.filter(b => b.id !== bookingToDelete.id);
        return of(updatedBookings);
      }),
      catchError((error) => {
        console.error('Error deleting booking from backend:', error);
        return of(currentBookings);
      })
    );
  }
  

  editSlot(newBooking: BookingList, currentBookings: BookingList[]): Observable<BookingList[]> {
    return this.getAllBookings().pipe(
      switchMap((bookings) => {
        const index = bookings.findIndex(b => b.id === newBooking.id);
        if (index !== -1) {
          bookings[index] = { ...newBooking };
          localStorage.setItem(this.bookingKey, JSON.stringify(bookings));
          return of(bookings);
        } else {
          console.warn(`Booking with id ${newBooking.id} not found in localStorage.`);
          return of([]);
        }
      }),
      catchError((error) => {
        console.error('Error updating booking in localStorage:', error);
        return of([]);
      })
    );
  }
}
