import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '@src/environments/environment';

import { CryptoService } from './crypto.service';

let mockResponseList = {
  bpi: {
    '2022-01-15': 43096.105,
    '2022-01-16': 43091.2567,
  },
  disclaimer:
    'This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.',
  time: {
    updated: 'Jan 31, 2022 06:21:01 UTC',
    updatedISO: '2022-01-31T06:21:01+00:00',
  },
};
let mockReponseDetail = {
  BTC: {
    USD: 37908.44,
    EUR: 34029.57,
    COP: 151602061.1,
  },
};

describe('CryptoService', () => {
  let service: CryptoService;
  let httpMock: HttpTestingController;
  let uriCoindesk = `${environment.apiConindesk}`;
  let uriCryptocompare = `${environment.apiCryptocompare}`;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CryptoService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterAll(() => {
    httpMock.verify();
  });
  it('should be created service', () => {
    expect(service).toBeTruthy();
  });

  it('should CryptoService history success ', () => {
    service.history('USD', '2022-01-15', '2022-01-30').subscribe((response) => {
      expect(response).toEqual([{date:'2022-01-15', price:43096.105},{date:'2022-01-16', price:43091.2567}]);
    });
    const req = httpMock.expectOne(
      `${uriCoindesk}v1/bpi/historical/close.json?currency=USD&start=2022-01-15&end=2022-01-30`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponseList);
  });
  it('should CryptoService detail success ', () => {
    service.detail('BTC', 'USD', 123456789).subscribe((response) => {
      expect(response).toEqual([{currency: 'USD', price: 37908.44},{currency: 'EUR', price: 34029.57},{currency: 'COP', price: 151602061.1}]);
    });
    const req = httpMock.expectOne(
      `${uriCryptocompare}data/pricehistorical?fsym=BTC&tsyms=USD&ts=123456789`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockReponseDetail);
  });
});
