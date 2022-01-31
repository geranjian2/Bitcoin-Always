import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CryptoListComponent } from './crypto-list.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CryptoService } from '@services/crypto/crypto.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { crypto } from '@models/crypto';
import { of } from 'rxjs';

let cryptoMock: crypto = {
  date: '2022-01-30',
  price: 1000,
  currency: 'USD',
};
describe('CryptoListComponent', () => {
  let service: any;
  let response = false;
  let component: CryptoListComponent;
  let fixture: ComponentFixture<CryptoListComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CryptoListComponent],
      providers: [
        CryptoService,
        DatePipe,
        { provide: Router, useValue: router },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    let baseTime = new Date(2022, 0, 30);
    jasmine.clock().mockDate(baseTime);
    service = TestBed.get(CryptoService);
    fixture = TestBed.createComponent(CryptoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    jasmine.clock().tick(60000);
  });

  it('should getListCrypto response success', () => {
    spyOn(service, 'history').and.returnValue(of([cryptoMock]));
    spyOn(component, 'getToday');
    jasmine.clock().tick(1000);
    component.getListCrypto();
    expect(component.listCrypto).toEqual([cryptoMock]);
  });
  it('should getListCrypto response undefined', () => {
    spyOn(service, 'history').and.returnValue(of(undefined));
    jasmine.clock().tick(1000);
    component.getListCrypto();
    expect(component.listCrypto).toEqual([]);
  });

  it('should getListCrypto dateNow = null', () => {
    component.dateNow = null;
    jasmine.clock().tick(1000);
    component.getListCrypto();
    expect(component.listCrypto).toEqual([]);
  });

  it('should getToday response success', () => {
    spyOn(service, 'detail').and.returnValue(of([cryptoMock]));
    component.getToday();
    expect(component.listCrypto).not.toEqual([]);
  });

  it('should getToday response null', () => {
    spyOn(service, 'detail').and.returnValue(of(null));
    component.getToday();
    expect(component.listCrypto).toEqual([]);
  });

  it('should viewDetail Router', () => {
    component.viewDetail(cryptoMock);
    expect(router.navigate).toHaveBeenCalledWith(['/detail/2022-01-30']);
  });
});
