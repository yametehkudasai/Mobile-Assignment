import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckWeatherPagePage } from './check-weather-page.page';

const routes: Routes = [
  {
    path: '',
    component: CheckWeatherPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckWeatherPagePageRoutingModule { }
