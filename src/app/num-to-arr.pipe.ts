import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToArr'
})
export class NumToArrPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]) {
    return [...Array(value).keys()];
  }

}
