import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './component/restaurants/restaurants.component';
import { BookingComponent } from './component/booking/booking.component';
import { BookingListComponent } from './component/booking-list/booking-list.component';


const routes: Routes = [
  {path:'',
    component:RestaurantsComponent
  },
  {
    path:'restaurants',
    component:RestaurantsComponent
  },
  {
    path:'booking/:id',
    component:BookingComponent
  },
  {
    path:'list',
    component:BookingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
