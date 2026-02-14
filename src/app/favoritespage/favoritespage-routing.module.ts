import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoritespagePage } from './favoritespage.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritespagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritespagePageRoutingModule { }
