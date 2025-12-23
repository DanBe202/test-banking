import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'maskCardNumber',
})
export class MaskCardNumberPipe implements PipeTransform {

  transform(value: string): string {
    return `**** **** **** ${value.slice(-4)}`;
  }
}
