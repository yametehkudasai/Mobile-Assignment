import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsummarypagePage } from './paymentsummarypage.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsummarypagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsummarypagePageRoutingModule { }
