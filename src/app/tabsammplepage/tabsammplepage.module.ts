import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsammplepagePageRoutingModule } from './tabsammplepage-routing.module';

import { TabsammplepagePage } from './tabsammplepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsammplepagePageRoutingModule,
    TabsammplepagePage
  ]
})
export class TabsammplepagePageModule { }
