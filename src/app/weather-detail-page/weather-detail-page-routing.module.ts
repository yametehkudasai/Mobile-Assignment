import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherDetailPagePage } from './weather-detail-page.page';

const routes: Routes = [
  {
    path: '',
    component: WeatherDetailPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherDetailPagePageRoutingModule { }
