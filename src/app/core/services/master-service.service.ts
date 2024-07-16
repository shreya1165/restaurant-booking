import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
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

  bookRestaurantSlot(newBooking: BookingList,bookings:BookingList[]): Observable<BookingList[]> {
    try {
      const updatedBookingsList = [...bookings, newBooking];
      localStorage.setItem(this.bookingKey, JSON.stringify(updatedBookingsList));
      return of(updatedBookingsList);
      } catch (error) {
        console.error('Error parsing bookings from localStorage:', error);
        return of([]);
      }
    }

    deleteSlot(bookingToDelete: BookingList, currentBookings: BookingList[]): Observable<BookingList[]> {
      return this.getAllBookings().pipe(
        switchMap((bookings) => {
          const index = bookings.findIndex(b => b.id === bookingToDelete.id);
          if (index !== -1) {
            bookings.splice(index, 1); 
            localStorage.setItem(this.bookingKey, JSON.stringify(bookings));
            return of(bookings);
          } else {
            console.warn(`Booking with id ${bookingToDelete.id} not found in localStorage.`);
            return of([]);
          }
        }),
        catchError((error) => {
          console.error('Error deleting booking from localStorage:', error);
          return of([]);
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
  
  
