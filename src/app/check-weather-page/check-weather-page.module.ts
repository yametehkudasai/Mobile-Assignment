import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckWeatherPagePageRoutingModule } from './check-weather-page-routing.module';

import { CheckWeatherPagePage } from './check-weather-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckWeatherPagePageRoutingModule
  ],
  declarations: [CheckWeatherPagePage]
})
export class CheckWeatherPagePageModule { }
