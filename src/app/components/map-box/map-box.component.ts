import { Component, OnInit } from "@angular/core";
import { MapService } from "src/app/services/map.service";
import * as mapboxgl from "mapbox-gl";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { RestaurantService } from "src/app/services/restaurant.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-map-box",
  templateUrl: "./map-box.component.html",
  styleUrls: ["./map-box.component.css"],
})
export class MapBoxComponent implements OnInit {
  rtoggle = "streets-v11";

  //default settings
  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/" + this.rtoggle;
  lat = 37.75;
  lng = -122.41;
  message = "hello world";


  marker: mapboxgl.Marker;

  coordinat = document.getElementById('coordinates');

  constructor(
    public mapService: MapService,
    public _restService: RestaurantService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    //locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // this.lat = position.coords.latitude;
        // this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat],
        });
      });
    }

    this.buildMap();
  }

  cambios(form: NgForm) {
    let newStryle = "mapbox://styles/mapbox/" + form.controls.rtoggle.value;
    this.map.setStyle(newStryle);

    console.log(newStryle);
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: "map",
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });

    //add map controls
    this.map.addControl(
      new MapboxGeocoder({
        accessToken: environment.mapboxKey,
        mapboxgl: mapboxgl,
      })
    );

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());

    //add marken on click
    this.map.on("click", (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];

      let coorde = {
        lng: coordinates[0],
        lat: coordinates[1],
      };

      this.crarMarcador(coorde);
      
    });
  }

  crarMarcador(coorde){
    this.marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([coorde.lng, coorde.lat])
      .addTo(this.map);
      
      this.marker.on('dragend', ()=> {
      var lngLat = this.marker.getLngLat();
      console.log(lngLat);
      this.mapService.coordenadas.emit(lngLat);
    });
    
  }

  buscarRestFromCoordenates() {
    this.router.navigate(["/home", "map"]);
  }
}
