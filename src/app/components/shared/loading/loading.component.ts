import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: []
})
export class LoadingComponent implements OnInit {

  // @Input() rest:any
  // @Output() dato: EventEmitter<any> = new EventEmitter()

  constructor() { }

   ngOnInit() {
    //  console.log(this.rest);
  }

  // enviarDato(id:string){
  //   this.dato.emit(id);
  // }

}
