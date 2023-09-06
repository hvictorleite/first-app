import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: any) {
    if (value.length === 0)
      return '';

    var reversed = '';
    let i: number;
    for (i = value.length - 1; i >= 0; i--)
      reversed += value.at(i);

    return reversed;
  }
}
