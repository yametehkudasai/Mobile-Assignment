import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsammplepagePage } from './tabsammplepage.page';

const routes: Routes = [
  {
    path: '',
    component: TabsammplepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsammplepagePageRoutingModule { }
