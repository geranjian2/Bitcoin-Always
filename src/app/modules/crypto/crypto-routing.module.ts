import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CryptoListComponent,  } from '@modules/crypto/crypto-list/crypto-list.component';
import { CryptoDetailComponent } from '@modules/crypto/crypto-detail/crypto-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoListComponent
  },
  {
    path: 'detail/:date',
    component: CryptoDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoRoutingModule { }
