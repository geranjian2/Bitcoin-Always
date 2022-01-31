import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { crypto } from '@models/crypto';
import { CryptoService } from '@services/crypto/crypto.service';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.scss'],
})
export class CryptoDetailComponent implements OnInit {
  cryptoList: crypto[] = [];
  dateGetUri: string = '';
  constructor(
    private router: Router,
    private routeActive: ActivatedRoute,
    private _cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    this.dateGetUri = this.routeActive.snapshot.params['date'];
    if (this.dateGetUri) {
      this.getDetailCrypto();
    }
  }

  getDetailCrypto(): void {
    this._cryptoService
      .detail('BTC', 'USD,EUR,COP', new Date(this.dateGetUri).getTime() / 1000)
      .subscribe((response) => {
        if (response) {
          this.cryptoList = response;
        }
      });
  }

  rollback() {
    this.router.navigate(['/']);
  }
}
