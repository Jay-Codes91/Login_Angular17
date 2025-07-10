import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray',
  standalone: true
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(object: any = []): any {
    return Object.values(object);
  }

}
