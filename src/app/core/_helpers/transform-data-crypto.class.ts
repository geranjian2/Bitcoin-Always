import { Injectable } from '@angular/core';
import { crypto } from '@models/crypto';
@Injectable({
  providedIn: 'root'
})
export class TransformDataCrypto {
  constructor() {}
  newArrayCrypto(data: object, keyvalues: Array<string>): any {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const arrayNew = keys.map((value, i) => {
      const valueNew: any = {};
      valueNew[keyvalues[0]] = value;
      valueNew[keyvalues[1]] = values[i];

      return valueNew;
    });
    return arrayNew;
  }
}
