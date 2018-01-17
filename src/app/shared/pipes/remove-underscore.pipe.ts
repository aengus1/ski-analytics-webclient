import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderscore'
})
export class RemoveUnderscorePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    /* string formatter for replacing underscores in enum constants for display */
      return value  ? value.replace(/_/g, ' ') : '';
    }
}
