import {Pipe, PipeTransform} from '@angular/core';

export enum DISTANCE_UNITS {
  KMS,
  MILES
}

const toMiles = 0.00062137119223;
const toKm = 0.001;
const toFt = 3.28084;


/*
 * Formats a distance in metres to either Km, Miles or Feet, to 2 dp
 * Takes a string argument that defaults to 'km'.  Other accepted options are 'miles' or 'ft'
 * Usage:
 *   value | distance:km
 * Example:
 *   {{ 24562 | distance:'km' }}
 *   formats to: 24.56
 * Example:
 *  {{ 24562 |distance:'miles' }}
 *  formats to: 15.26
*/
@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(metres: number, unit?: string): string {

    if (metres === undefined || metres == null ) {
      return '';
    }

    let unformatted: number;

    switch (unit) {
      case 'km': {
        unformatted = metres * toKm;
        break;
      }
      case 'miles': {
        unformatted = metres * toMiles;
        break;
      }
      case 'ft': {
        unformatted = metres * toFt;
        break;
      }
      default: {
        unformatted = metres * toKm;
      }
    }

    return (Math.round(unformatted * 100) / 100).toFixed(2);
  }

}
