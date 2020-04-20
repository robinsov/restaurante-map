import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = true;
  source: string
  restaurants: any[] = [];

  constructor(public _restService: RestaurantService,
              public router: Router,
              public actiRouter:ActivatedRoute,
              public _mapService: MapService) {
                  this.actiRouter.params.subscribe( resp => {
                    this.source = resp['source'];
                  });
               };

  ngOnInit(): void {

    if ( this.source === 'noMap'){
      this._restService.cargarRestaurants().subscribe( resp => {
        console.log(resp);
        this.restaurants = resp;
        this.loading = false;
      });
    }else {
      this.cargarRestaurantesFromCoor()
    };
    
  }

  cargarRestaurantesFromCoor(){
    this._mapService.cargarRestaurantsFromCoordenadas().subscribe((restaurantes:any) => {
      console.log(restaurantes);
      this.restaurants = restaurantes;
      this.loading = false;
    });
  }

  getRestaurante(rest: any){
    let id = rest.restaurant.id;
    console.log(id);
    this.router.navigate(['/restaurante', this.source, id]);
  }

  


}
