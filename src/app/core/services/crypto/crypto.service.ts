import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { crypto } from '@models/crypto';
import { environment } from '@src/environments/environment';
import { ResponseDetail, ResponseHistory } from '@models/response';


@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  uriCoindesk = `${environment.apiConindesk}`;
  uriCryptocompare = `${environment.apiCryptocompare}`;
  constructor(
    private httpClient: HttpClient
  ) { }

  history(currency: string, startDate: string, endDate: string): Observable<crypto[] | undefined> {
    try {
      return this.httpClient.get<ResponseHistory>(
        `${this.uriCoindesk}v1/bpi/historical/close.json?currency=${currency}&start=${startDate}&end=${endDate}`).pipe(
          map(response => {
            return this.newArrayCrypto(response.bpi, ['date','price']);
          }),
          catchError(err => {
            console.log(err);
            return throwError('Error pers');
          })
        );
    } catch (error: any) {
      return throwError('Error pers');
    }
  }
  detail(crypto: string, typeCurrency: string, timestamp: number): Observable<crypto[] | undefined> {
    try {
      return this.httpClient.get<ResponseDetail>(
        `${this.uriCryptocompare}data/pricehistorical?fsym=${crypto}&tsyms=${typeCurrency}&ts=${timestamp}`).pipe(
          map(response => {
            console.log(this.newArrayCrypto(response.BTC,['currency','price']));
            return this.newArrayCrypto(response.BTC,['currency','price']);
          }),
          catchError(err => {
            console.log(err);
            return throwError('Error pers');
          })
        );
    } catch (error: any) {
      return throwError('Error pers');
    }
  }
  newArrayCrypto(data: object, keyvalues: Array<string>): crypto[] {
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
