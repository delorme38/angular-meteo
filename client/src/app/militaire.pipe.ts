import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'militaire'
})
export class MilitairePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const heure = value/100;
    return (`${heure}:00`);
  }

}
