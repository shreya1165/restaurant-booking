import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Restaurants } from '../../core/interfaces/restaurants';
import { Store } from '@ngrx/store';
import { loadRestaurant } from '../../store/restaurant/restaurants.actions';
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
  displayColumns: string[] = ['ratings', 'name', 'address', 'img', 'text', ''];

  isloading: boolean | undefined;

  constructor(private store: Store) {
    this.dataSource = new MatTableDataSource<Restaurants>();
  }

  ngOnInit(): void {
    this.store.select(getspinnerstate).subscribe((res) => {
      console.log(res);
      this.isloading = res;
    });

    this.loadInitialData();
  }

  loadInitialData() {
    this.store.dispatch(loadRestaurant());

    this.store
      .select(getrestaurantlist)
      .subscribe((restaurants: Restaurants[]) => {
        if (restaurants && restaurants.length > 0) {
          this.dataSource.data = restaurants;
        } else {
          this.store.dispatch(loadRestaurant());
        }
      });
  }
}
