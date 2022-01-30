import { Injectable } from '@angular/core';
import { crypto } from '@models/crypto';
@Injectable()
export class TransformDataCrypto<T> {
  constructor() {}
  newArrayCrypto(array: object, keyvalues: Array<string>): T[] {
    const keys = Object.keys(array);
    const values = Object.values(array);
    const arrayNew = keys.map((value, i) => {
      const valueNew: any = {};
      valueNew[keyvalues[0]] = value;
      valueNew[keyvalues[1]] = values[i];

      return valueNew;
    });
    return arrayNew;
  }
}
