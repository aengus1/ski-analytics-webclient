import {Pipe, PipeTransform} from '@angular/core';

export enum PACE_UNITS {
  METRES_PER_SECOND,
  MINS_PER_KM,
  KM_PER_HOUR,
  FT_PER_SECOND,
  MILES_PER_HOUR,
  MINS_PER_MILE
}

const toMetresPerSecond = 0.277778;
const MinsPerKm = 60;
const toKmPerHour = 1;
const toFtPerSecond = 0.911344;
const toMilesPerHour = 0.6213709090909588;
const MinsPerMile = 96.5606854;


/*
 * Formats a pace in km/h to either metres / sec, mins / km, ft/sec, mph or mins/mile
 * Takes a string argument that defaults to 'KM_PER_HOUR'.  Other accepted options are:
 * METRES_PER_SECOND,
 * MINS_PER_KM,
 * KM_PER_HOUR,
 * FT_PER_SECOND,
 * MILES_PER_HOUR,
 *  MINS_PER_MILE
 * Usage:
 *   value | pace:'METRES_PER_SECOND'
 * Example:
 *   {{ 24 | pace:'METRES_PER_SECOND' }}
 *   formats to: 6.67
 * Example:
 *  {{ 24.012897823 | pace:'KM_PER_HOUR' }}
 *  formats to: 24.01
*/
@Pipe({
  name: 'pace'
})
export class PacePipe implements PipeTransform {

  transform(kmph: number, unit?: string): string {

    if (kmph === undefined || kmph == null ) {
      return '';
    }

    let unformatted: number;

    switch (unit) {
      case 'METRES_PER_SECOND': {
        unformatted = kmph * toMetresPerSecond;
        break;
      }
      case 'KM_PER_HOUR': {
        unformatted = kmph * toKmPerHour;
        break;
      }
      case 'MINS_PER_KM': {
        unformatted = MinsPerKm / kmph;
        break;
      }
      case 'FT_PER_SECOND': {
       unformatted = kmph * toFtPerSecond;
       break;
      }
      case 'MILES_PER_HOUR': {
        unformatted = kmph * toMilesPerHour;
        break;
      }
      case 'MINS_PER_MILE' : {
        unformatted = MinsPerMile / kmph;
        break;
      }
      default: {
        unformatted = kmph * toKmPerHour;
      }
    }

    return (Math.round(unformatted * 100) / 100).toFixed(2);
  }

}
