import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'cartbutton',
        loadChildren: () => import('../cartpage/cartpage.module').then(m => m.CartpagePageModule),
      },
      {
        path: 'homepagebutton',
        loadChildren: () => import('../homepage/homepage.module').then(m => m.HomepagePageModule),
      },
      {
        path: "",
        redirectTo: "/tabs/cartbutton",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
