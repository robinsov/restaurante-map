import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  url = 'https://developers.zomato.com/api/v2.1'
  
  headers = new HttpHeaders({
    'user-key': '93428b6ae961a4819bdf25d3d7633be2'
  })
 

  constructor(public http : HttpClient) { }

  cargarRestaurants(){

    let url =  `${this.url}/search`

    return this.http.get(url, {headers: this.headers}).pipe( map ((resp:any) => {
      return resp.restaurants
    }))
  }


  

  getRestaurant(id: string){

    let url = `${this.url}/restaurant?res_id=${id}`

    return this.http.get(url, {headers: this.headers}).pipe( map ((resp:any) => {
      return resp
    }))
  }
}
