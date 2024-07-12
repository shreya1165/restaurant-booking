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
} from './restaurants.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RestaurantEffects {
  constructor(
    private action$: Actions,
    private service: MasterServiceService
  ) {}

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
}
