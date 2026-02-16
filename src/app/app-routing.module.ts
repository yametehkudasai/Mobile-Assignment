import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepagePageModule)
  },
  {
    path: 'productdetailpage/:ProductId',
    loadChildren: () => import('./productdetailpage/productdetailpage.module').then(m => m.ProductdetailpagePageModule)
  },
  {
    path: 'cartpage',
    loadChildren: () => import('./cartpage/cartpage.module').then(m => m.CartpagePageModule)
  },
  {
    path: 'tabsammplepage',
    loadChildren: () => import('./tabsammplepage/tabsammplepage.module').then(m => m.TabsammplepagePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'favoritespage',
    loadChildren: () => import('./favoritespage/favoritespage.module').then(m => m.FavoritespagePageModule)
  },
  {
    path: 'paymentsummarypage',
    loadChildren: () => import('./paymentsummarypage/paymentsummarypage.module').then(m => m.PaymentsummarypagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'check-weather-page',
    loadChildren: () => import('./check-weather-page/check-weather-page.module').then(m => m.CheckWeatherPagePageModule)
  },
  {
    path: 'account-list',
    loadChildren: () => import('./account-list/account-list.module').then(m => m.AccountListPageModule)
  },
  {
    path: 'weather-detail-page',
    loadChildren: () => import('./weather-detail-page/weather-detail-page.module').then(m => m.WeatherDetailPagePageModule)
  },
  {
    path: 'transaction-history',
    loadChildren: () => import('./transaction-history/transaction-history.module').then(m => m.TransactionHistoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }