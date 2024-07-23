import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterServiceService } from "../../core/services/master-service.service";
import { booking, bookingFail, bookingSuccess, deleteBooking, deleteBookingFail, deleteBookingSuccess, loadBookingFail, loadBookingsList, loadBookingSuccess, updateBooking, updateBookingFail, updateBookingSuccess } from "./booking.action";
import { catchError, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class BookingEffects {
  private _snackBar: any;
  constructor(
    private action$: Actions,
    private service: MasterServiceService
  ) { }

  loadBookingList$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadBookingsList),
      switchMap(() =>
        this.service.getAllBookings().pipe(
          switchMap((bookings) => {
            return of(loadBookingSuccess({ bookings }));
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
      ofType(booking),
      switchMap(({ booking }) =>
        this.service.bookRestaurantSlot(booking).pipe(
          map((booking) => bookingSuccess({booking})),
          catchError((error) =>
            of(bookingFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  updateSlot$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateBooking),
      switchMap(({ bookings, currentBookings }) =>
        this.service.editSlot(bookings, currentBookings).pipe(
          map((updatedBookings) => updateBookingSuccess({
            booking: updatedBookings,
            success: 'Success'
          })),
          catchError((error) =>
            of(updateBookingFail({ errorMessage: error.message }))
          )
        )
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
