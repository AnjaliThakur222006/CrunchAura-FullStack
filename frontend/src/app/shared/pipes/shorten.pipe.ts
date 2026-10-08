import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'shorten',standalone:true})
export class ShortenPipe implements PipeTransform {
  transform(value: string, max = 48): string {
    if (!value || value.length <= max) return value;
    return value.slice(0,max).trimEnd() + '…';
  }
}
