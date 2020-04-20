import { Injectable, EventEmitter } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  url = 'https://developers.zomato.com/api/v2.1'
  
  headers = new HttpHeaders({
    'user-key': '93428b6ae961a4819bdf25d3d7633be2'
  })
 

  public coordenadas = new EventEmitter<any>();
  lng: string;
  lat: string;

  constructor(public http : HttpClient) {
    (mapboxgl as any).accessToken = environment.mapboxKey;
   }

   cargarRestaurantsFromCoordenadas(){
     this.coordenadas.subscribe(resp => {
       this.lng = resp.lng;
       this.lat = resp.lat;
      })

      console.log(this.lat, this.lng);
      
      let url =  `${this.url}/search?lat=${this.lat}&lon=${this.lng}&count=10&radius=10&sort=rating&order=asc`;
         return this.http.get(url, {headers: this.headers}).pipe( map ((resp:any) => {
           return resp.restaurants
         }))
  
  }  
}
