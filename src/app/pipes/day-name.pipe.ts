import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toDayName'
})
export class DayNamePipe implements PipeTransform {
  transform(value) {
    const dayTimes = {
      Morning: [6, 9],
      Afternoon: [12, 15],
      Evening: [18, 21],
      Night: [0, 3]
    };

    const hours = new Date(value).getHours();

    for (const p in dayTimes) {
      if (dayTimes[p].includes(hours)) {
        return p;
      }
    }
  }
}
