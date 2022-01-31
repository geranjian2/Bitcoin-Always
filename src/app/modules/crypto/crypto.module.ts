import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoRoutingModule } from './crypto-routing.module';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { CryptoDetailComponent } from './crypto-detail/crypto-detail.component';
import { ComponentsModule } from '../../shared/components/components.module';


@NgModule({
  declarations: [CryptoListComponent, CryptoDetailComponent],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    ComponentsModule
  ]
})
export class CryptoModule { }
