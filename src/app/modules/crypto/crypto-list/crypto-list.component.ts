import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { crypto } from '@models/crypto';
import { CryptoService } from '@services/crypto/crypto.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.scss'],
})
export class CryptoListComponent implements OnInit, OnDestroy {
  listCrypto: crypto[] = [];
  viewPreload:boolean = false;
  date = new Date();
  private unsubscribe: Subject<void> = new Subject();
  startDay = this.datePipe.transform(this.date.setDate(this.date.getDate()-15),'yyyy-MM-dd');
  dateNow = this.datePipe.transform(Date.now(),'yyyy-MM-dd');


  constructor(
    private datePipe: DatePipe,
    private _cryptoService:CryptoService,
    private router: Router) {}



  ngOnInit(): void {
    this.getListCrypto();
    setInterval(() => {
      this.getListCrypto();
    },60000)
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  getListCrypto():void{
    this.viewPreload=true;
    setTimeout(() => {

      if(this.dateNow && this.startDay){
        this._cryptoService.history('USD',this.startDay,this.dateNow).pipe(
          takeUntil(this.unsubscribe),
        ).subscribe(response => {
          if(response!= undefined){

            this.listCrypto = response.reverse();
            this.getToday();
          }

        });
      }
    }, 1000);
  }
  getToday():void{
    this._cryptoService.detail('BTC','USD',new Date().getTime()/1000).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(response =>{
      if(response && this.dateNow){
          let todayCrypto:crypto[] = response;
          todayCrypto[0].date = this.dateNow;
          this.listCrypto.unshift(todayCrypto[0]);
      }
      this.viewPreload=false;
    });
  }
  viewDetail(crypto:crypto):void{
    this.router.navigate([`/detail/${crypto.date}`]);
  }
}
