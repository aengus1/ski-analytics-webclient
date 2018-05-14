import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'interval'
})
export class IntervalPipe implements PipeTransform {

  transform(seconds: any, args?: any): any {
    if (seconds <= 0) {
      return '00:00:00';
    }
    const hours = Math.floor(seconds / 60 / 60);
    const minutes = Math.floor((seconds / 60) - (hours * 60));
    const sec = Math.floor(seconds - (minutes * 60) - (hours * 3600));
    return this.pad(hours, 2) + ':' + this.pad(minutes, 2) + ':' + this.pad(sec, 2);
  }

  /* pad a number (num) as a string with  (size) leading zeroes */
  pad(num: number, size: number) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

}
