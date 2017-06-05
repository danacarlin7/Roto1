/**
 * Created by Hiren on 06-05-2017.
 */

import {Pipe, PipeTransform} from "@angular/core";
import {DecimalPipe} from "@angular/common";
@Pipe({
  name: 'dfsAmount'
})
export class DFSAmountPipe extends DecimalPipe {
  constructor() {
    super('en-US');
  }

  transform(value:any):string {
    let newValue:string = '';
    if (value < 0) {
      newValue = '($' + super.transform(value * -1) + ')'
    }
    else {
      newValue = '$' + super.transform(value);
    }
    return newValue;
  }
}
