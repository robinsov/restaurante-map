import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string) {

    let url = '';

    if(!img){
      return url += 'assets/img/noimage.png'
    }

    return img;
  }

}
