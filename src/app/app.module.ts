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
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { LoaderComponent } from './core/loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MasterServiceService } from './core/services/master-service.service';
import { RestaurantsComponent } from './component/restaurants/restaurants.component';
import { RestaurantReducer } from './store/restaurant/restaurants.reducer';
import { RestaurantEffects } from './store/restaurant/restaurants.effects';
import {MatGridListModule} from '@angular/material/grid-list';
import { BookingComponent } from './component/booking/booking.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { BookingListComponent } from './component/booking-list/booking-list.component';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditComponent } from './component/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuHeaderComponent,
    LoaderComponent,
    RestaurantsComponent,
    BookingComponent,
    BookingListComponent,
    ConfirmationComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSnackBarModule,
    MatIconModule,
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
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [DatePipe, provideHttpClient(withInterceptors([tokenInterceptor])),MasterServiceService ,provideStore({ restaurant: RestaurantReducer }),provideEffects([RestaurantEffects])],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
