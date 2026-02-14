import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritespagePageRoutingModule } from './favoritespage-routing.module';

import { FavoritespagePage } from './favoritespage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritespagePageRoutingModule
  ],
  declarations: [FavoritespagePage]
})
export class FavoritespagePageModule { }
