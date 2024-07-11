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
          catchError((error) => of(restaurantFail({ errorMessage: error.message })))
        )
      )
    )
  );

  loadBookingList$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadBooking),
      switchMap(() =>
        this.service.getAllBookings().pipe(
          map((data) => loadBookingSuccess({ bookings: data })), 
          catchError((error) => of(loadBookingFail({ errorMessage: error.message })))
        )
      )
    )
  );
}
