import { Pipe, PipeTransform } from '@angular/core';
import { DataModel } from '../data-transfer/data.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: DataModel[], filterString: string, property: string) {
    if (filterString === '') return value;
    let filteredArray: DataModel[] = [];

    for (let student of value) {
      if (
        student[property].toLowerCase().startsWith(filterString.toLowerCase())
      )
        filteredArray.push(student);
    }

    return filteredArray;
  }
}
