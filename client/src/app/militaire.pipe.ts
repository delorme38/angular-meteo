import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'militaire'
})
export class MilitairePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    //900 => 9:00
    if (typeof value === 'number'){
      const heure = value/100;
      return `${heure} +':00`;
    }
    
    return null;
  }

}
