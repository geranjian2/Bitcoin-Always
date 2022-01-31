import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoDetailComponent } from './crypto-detail.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CryptoService } from '@services/crypto/crypto.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { crypto } from '@models/crypto';


let cryptoMock:crypto = {
  date: '2022-01-30',
  price: 1000,
  currency: 'USD'
}
describe('CryptoDetailComponent', () => {
  let component: CryptoDetailComponent;
  let fixture: ComponentFixture<CryptoDetailComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  let service:any;
  let activatedRouteSpy:any;
  beforeEach(async () => {
    activatedRouteSpy = {
      snapshot: {
        params: {
          date: '2022-01-23'
        }
      }
    };

    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ CryptoDetailComponent ],
      providers:[
        CryptoService,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
      schemas:[
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoDetailComponent);
    service = TestBed.get(CryptoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create, get param date', () => {
    spyOn(component,'getDetailCrypto');
    expect(component).toBeTruthy();
    expect(component.dateGetUri).toBe('2022-01-23');
    activatedRouteSpy.snapshot.params = {
      date: ''
    };
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.dateGetUri).toBe('');
  });
  it('should getDetailCrypto response success', () => {
    spyOn(service , "detail").and.returnValue(of([cryptoMock]))
    component.getDetailCrypto();
    expect(component.cryptoList).toEqual([cryptoMock]);
  });
  it('should getDetailCrypto response null', () => {
    spyOn(service , "detail").and.returnValue(of(null))
    component.getDetailCrypto();
    expect(component.cryptoList).toEqual([]);
  });
  it('should rollback Router', ()=>{
    component.rollback();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  })

});
