import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuHeaderComponent } from './component/menu-header/menu-header.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/services/token.interceptor';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoaderComponent } from './core/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MasterServiceService } from './core/services/master-service.service';
import { RestaurantsComponent } from './component/restaurants/restaurants.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { BookingComponent } from './component/booking/booking.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { BookingListComponent } from './component/booking-list/booking-list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { _RestaurantReducer } from './store/restaurant/restaurants.reducer';
import { RestaurantEffects } from './store/restaurant/restaurants.effects';

@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    LoaderComponent,
    RestaurantsComponent,
    BookingComponent,
    BookingListComponent
  ],
  imports: [
    BrowserModule,
    StoreDevtoolsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbar,
    MatRadioModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIcon,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    StoreModule.forRoot(({ rb: _RestaurantReducer })),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    EffectsModule.forRoot([RestaurantEffects]),
  ],
  providers: [DatePipe, provideHttpClient(withInterceptors([tokenInterceptor])),
  MasterServiceService, 
  // provideStore({ restaurant: RestaurantReducer }),
  // provideEffects([RestaurantEffects])
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
