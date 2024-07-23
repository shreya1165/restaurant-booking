import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterServiceService } from "../../core/services/master-service.service";
import { loadRestaurants, loadRestaurantsFail, loadRestaurantsSucess } from "./restaurant.action";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class RestaurantEffects {
  private _snackBar: any;
  constructor(
    private action$: Actions,
    private service: MasterServiceService
  ) { }

  loadRestaurant$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadRestaurants),
      switchMap(() =>
        this.service.getAllRestaurants().pipe(
          map((data) => loadRestaurantsSucess({ list: data })),
          catchError((error) => {
            this._snackBar.open('Failed to load restaurants.', 'Close', { duration: 3000 });  // Handle error by showing snack bar
            return of(loadRestaurantsFail({ errorMessage: error.message }));
          })
        )
      )
    )
  );

  
}