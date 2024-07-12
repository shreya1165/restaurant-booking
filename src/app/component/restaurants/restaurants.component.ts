import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookingList, Restaurants } from '../../core/interfaces/restaurants';
import { Store } from '@ngrx/store';
import {
  getrestaurantlist,
  getspinnerstate,
} from '../../store/restaurant/restaurants.selector';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css',
})
export class RestaurantsComponent {
  dataSource: MatTableDataSource<Restaurants>;
  bookingDataSource: MatTableDataSource<BookingList>;
  displayColumns: string[] = ['ratings', 'name', 'address', 'img', 'text'];

  isloading: boolean | undefined;

  constructor(private store: Store) {
    this.dataSource = new MatTableDataSource<Restaurants>();
    this.bookingDataSource = new MatTableDataSource<BookingList>();
  }

  ngOnInit(): void {
    this.store.select(getspinnerstate).subscribe((res) => {
      this.isloading = res;
    });

    this.loadInitialData();
  }

  loadInitialData() :void{
    this.store
      .select(getrestaurantlist)
      .subscribe((restaurants: Restaurants[]) => {
        if (restaurants && restaurants.length > 0) {
          this.dataSource.data = restaurants;
        }
      });
  }
}
