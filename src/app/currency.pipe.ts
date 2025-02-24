import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe',
})

export class CurrencyPipe implements PipeTransform {
  transform(value: any): string {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
