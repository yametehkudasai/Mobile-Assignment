import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsummarypagePageRoutingModule } from './paymentsummarypage-routing.module';

import { PaymentsummarypagePage } from './paymentsummarypage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsummarypagePageRoutingModule
  ],
  declarations: [PaymentsummarypagePage]
})
export class PaymentsummarypagePageModule { }
