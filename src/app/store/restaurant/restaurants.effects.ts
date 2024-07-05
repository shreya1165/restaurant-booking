import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MasterServiceService } from '../../core/services/master-service.service';
import {
  restaurantFail,
  restaurantSucess,
  loadRestaurant,
} from './restaurants.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable()
export class RestaurantEffects {
  constructor(
    private action$: Actions,
    private service: MasterServiceService
  ) {}

  _loadRestaurant = createEffect(() =>
    this.action$.pipe(
      ofType(loadRestaurant),
      switchMap((action) => {
        return this.service.getAllRestaurants().pipe(
          map((data) => {
            return restaurantSucess({ list: data });
          }),
          catchError((_err) =>
            of(restaurantFail({ errorMessage: _err.message }))
          )
        );
      })
    )
  );
}
