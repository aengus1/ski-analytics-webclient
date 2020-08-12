import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'interval'
})
export class IntervalPipe implements PipeTransform {

  private leadingZeroes = true;

  transform(seconds: any, args?: any): any {
    try {
      if (seconds <= 0) {
        return '00:00:00';
      }
      const hours = Math.floor(seconds / 60 / 60);
      const minutes = Math.floor((seconds / 60) - (hours * 60));
      const sec = Math.floor(seconds - (minutes * 60) - (hours * 3600));
      return (hours > 0 || this.leadingZeroes ? this.pad(hours, 2) + ':' : '') + this.pad(minutes, 2) + ':' + this.pad(sec, 2);
    } catch (ex) {
      console.warn('[Interval Pipe]  transform error ' + ex);
    }
  }

  /* pad a number (num) as a string with  (size) leading zeroes */
  pad(num: number, size: number) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  setLeadingZeroes(leadingZeroes: boolean) {
    this.leadingZeroes = leadingZeroes;
}

}
