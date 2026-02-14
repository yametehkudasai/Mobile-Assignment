import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartpagePageRoutingModule } from './cartpage-routing.module';

import { CartpagePage } from './cartpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartpagePageRoutingModule
  ],
  declarations: [CartpagePage]
})
export class CartpagePageModule { }
