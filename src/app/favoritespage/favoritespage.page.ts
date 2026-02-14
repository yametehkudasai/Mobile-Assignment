import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Staticlistservice } from '../Database/staticlistservice';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-favoritespage',
  templateUrl: './favoritespage.page.html',
  styleUrls: ['./favoritespage.page.scss'],
  standalone: false,
})
export class FavoritespagePage implements OnInit {

  favoritesList: {
    Id: number,
    Image: string,
    ProductName: string,
    Price: number,
    BackgroundColor: string,
    Ingredientlist: string,
    Description: string
  }[] = [];

  constructor(
    private database: Staticlistservice,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritesList = this.database.getFavorites();
  }

  goBack() {
    this.router.navigate(['/homepage']);
  }

  navigateToProduct(productId: number) {
    this.router.navigate(['productdetailpage', productId]);
  }

  async removeFavorite(event: Event, productId: number) {
    event.stopPropagation();

    const alert = await this.alertController.create({
      header: 'Remove Favorite',
      message: 'Remove this item from favorites?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.database.removeFavorite(productId);
            this.loadFavorites();
            this.showToast('Removed from favorites');
          }
        }
      ]
    });

    await alert.present();
  }

  async clearFavorites() {
    if (this.favoritesList.length === 0) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Clear Favorites',
      message: 'Remove all favorites?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear All',
          role: 'destructive',
          handler: () => {
            this.database.clearFavorites();
            this.loadFavorites();
            this.showToast('Favorites cleared');
          }
        }
      ]
    });

    await alert.present();
  }

  async addToCart(event: Event, product: any) {
    event.stopPropagation();

    this.database.AddToCart(
      product.Id,
      product.Image,
      product.ProductName,
      product.Price,
      product.BackgroundColor,
      product.Ingredientlist,
      product.Description,
      1
    );

    this.showToast(`${product.ProductName} added to cart!`);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }
}