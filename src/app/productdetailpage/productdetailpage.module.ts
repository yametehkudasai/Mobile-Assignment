import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductdetailpagePageRoutingModule } from './productdetailpage-routing.module';

import { ProductdetailpagePage } from './productdetailpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductdetailpagePageRoutingModule
  ],
  declarations: [ProductdetailpagePage]
})
export class ProductdetailpagePageModule { }
