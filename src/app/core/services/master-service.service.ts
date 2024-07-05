import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurants } from '../interfaces/restaurants';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  constructor(private http:HttpClient) { }

  getAllRestaurants(){
    return this.http.get<Restaurants[]>('http://localhost:3000/posts')
  }
}
