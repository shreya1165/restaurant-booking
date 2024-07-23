import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Restaurants } from '../../../core/interfaces/restaurants';
import { Store } from '@ngrx/store';
import { getrestaurantlist, restaurantSpinner } from '../../../store/restaurant-store/restaurant.selector';
import { BookingList } from '../../../core/interfaces/booking';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css',
})
export class RestaurantsComponent {
  RestaurantdataSource: MatTableDataSource<Restaurants>;
  bookingDataSource: MatTableDataSource<BookingList>;
  displayColumns: string[] = ['ratings', 'name', 'address', 'img', 'text'];

  restaurantLoading: boolean | undefined;

  constructor(private store: Store) {
    this.RestaurantdataSource = new MatTableDataSource<Restaurants>();
    this.bookingDataSource = new MatTableDataSource<BookingList>();
  }

  ngOnInit(): void {
    this.store.select(restaurantSpinner).subscribe((res) => {
      this.restaurantLoading = res;
    });

    this.loadInitialData();
  }

  loadInitialData() :void{
    this.store
      .select(getrestaurantlist)
      .subscribe((restaurants: Restaurants[]) => {
        if (restaurants && restaurants.length > 0) {
          this.RestaurantdataSource.data = restaurants;
        }
      });
  }
}
