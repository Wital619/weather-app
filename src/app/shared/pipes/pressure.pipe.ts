import { Pipe, PipeTransform } from '@angular/core';
import { PRESSURE_COEFFICIENT } from '../constants/consts';

@Pipe({
  name: 'toMillimeters'
})
export class PressurePipe implements PipeTransform {
  transform (value: number): number {
    return Math.round(value * PRESSURE_COEFFICIENT);
  }
}
