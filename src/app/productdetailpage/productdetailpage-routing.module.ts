import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductdetailpagePage } from './productdetailpage.page';

const routes: Routes = [
  {
    path: '',
    component: ProductdetailpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductdetailpagePageRoutingModule { }
