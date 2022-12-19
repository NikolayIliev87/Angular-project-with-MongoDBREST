import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenDescription'
})
export class ShortenDescriptionPipe implements PipeTransform {

  transform(value: string, maxCount = 50): unknown {
    return `${value.substring(0, maxCount)}${value.length > maxCount?'...':''}`;
  }

}
