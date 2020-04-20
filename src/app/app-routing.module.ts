import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';
import { MapBoxComponent } from './components/map-box/map-box.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:source', component: HomeComponent },
  { path: 'restaurante/:pag/:id', component: RestauranteComponent },
  { path: 'map', component: MapBoxComponent },
  { path: '**', pathMatch:'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
