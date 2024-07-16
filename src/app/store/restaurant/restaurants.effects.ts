import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterServiceService } from '../../core/services/master-service.service';
import {
  restaurantFail,
  restaurantSucess,
  loadRestaurant,
  loadBookingSuccess,
  loadBookingFail,
  loadBooking,
  bookRestaurantSlot,
  bookRestaurantSlotFail,
  bookRestaurantSlotSuccess,
  editBooking,
  editBookingSuccess,
  deleteBooking,
  deleteBookingSuccess,
  deleteBookingFail,
} from './restaurants.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RestaurantEffects {
  private _snackBar: any;
  constructor(
    private action$: Actions,
    private service: MasterServiceService
  ) { }

  loadRestaurant$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadRestaurant),
      switchMap(() =>
        this.service.getAllRestaurants().pipe(
          map((data) => restaurantSucess({ list: data })),
          catchError((error) =>
            of(restaurantFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  loadBookingList$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadBooking),
      switchMap(() =>
        this.service.getAllBookings().pipe(
          switchMap((bookings) => {
            if (bookings.length > 0) {
              return of(loadBookingSuccess({ bookings }));
            } else {
              return of(
                loadBookingFail({ errorMessage: 'No bookings found.' })
              );
            }
          }),
          catchError((error) =>
            of(loadBookingFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  bookSlot$ = createEffect(() =>
    this.action$.pipe(
      ofType(bookRestaurantSlot),
      switchMap(({ booking, currentBookings }) =>
        this.service.bookRestaurantSlot(booking, currentBookings).pipe(
          map((updatedBookings) => bookRestaurantSlotSuccess({
            bookings: updatedBookings,
            success: 'success'
          })),

          catchError((error) =>
            of(bookRestaurantSlotFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  editSlot$ = createEffect(() =>
    this.action$.pipe(
      ofType(editBooking),
      switchMap(({ bookings, currentBookings }) =>
        {
          return this.service.editSlot(bookings, currentBookings).pipe(
            map((updatedBookings) => editBookingSuccess({
              booking: updatedBookings,
              success: 'success'
            })),

            catchError((error) => of(bookRestaurantSlotFail({ errorMessage: error.message }))
            )
          );
        }
      )
    )
  );


  deleteSlot$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteBooking),
      switchMap(({ booking, currentBookings }) =>
        this.service.deleteSlot(booking, currentBookings).pipe(
          map((updatedBookings) => deleteBookingSuccess({
            bookings: updatedBookings,
            success: 'success'
          })),
          catchError((error) =>
            of(deleteBookingFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );
  
  
}
