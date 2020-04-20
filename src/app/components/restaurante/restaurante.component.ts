import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {

  loading = true;
  restaurante: any;

  regresarA: string = "";


  constructor(public _restServices: RestaurantService,
              public actiRouter: ActivatedRoute,
              public router: Router) { 
                this.actiRouter.params.subscribe( rsp => {
                  this.getRestaurant(rsp['id']);
                })
              }

  ngOnInit(): void {
    this.actiRouter.params.subscribe(resp => {
      this.regresarA = resp['pag'];
    })
  }

  getRestaurant(id: string){
    this._restServices.getRestaurant(id).subscribe(resp => {
      this.loading = false;
      this.restaurante = resp
      console.log(resp);
    })
  }


  regresar(){
    if(this.regresarA === 'noMap'){
      this.router.navigate(['/home', 'noMap']);
    }else{
      this.router.navigate(['/home', 'map']);
    }
  }


}
