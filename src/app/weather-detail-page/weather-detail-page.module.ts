import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherDetailPagePageRoutingModule } from './weather-detail-page-routing.module';

import { WeatherDetailPagePage } from './weather-detail-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherDetailPagePageRoutingModule
  ],
  declarations: [WeatherDetailPagePage]
})
export class WeatherDetailPagePageModule { }
