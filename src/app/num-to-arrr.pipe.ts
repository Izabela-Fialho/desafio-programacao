import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToArrr'
})
export class NumToArrrPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
