import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './component/restaurant/restaurants/restaurants.component';
import { BookingComponent } from './component/bookings/booking/booking.component';
import { BookingListComponent } from './component/bookings/booking-list/booking-list.component';

const routes: Routes = [
  { path: '', component: RestaurantsComponent },
  {
    path: 'restaurants',
    component: RestaurantsComponent,
  },
  {
    path: 'booking/:id',
    component: BookingComponent,
  },
  {
    path: 'list',
    component: BookingListComponent,
  },
  {
    path: 'edit/:id/:bookingId',
    component: BookingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
