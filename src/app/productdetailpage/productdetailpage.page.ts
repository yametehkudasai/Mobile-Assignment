import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Staticlistservice } from '../Database/staticlistservice';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-productdetailpage',
  templateUrl: './productdetailpage.page.html',
  styleUrls: ['./productdetailpage.page.scss'],
  standalone: false,
})
export class ProductdetailpagePage implements OnInit {

  filterid: number = 0;
  filteritem: any;
  quantity: number = 1;
  isFavorite: boolean = false;

  constructor(
    private ActiveRoute: ActivatedRoute,
    private database: Staticlistservice,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.ActiveRoute.paramMap.subscribe((params: ParamMap) => {
      this.filterid = Number(params.get("ProductId"));
      this.filteritem = this.database.getProduct().find(x => x.Id === this.filterid);

      // check是否已收藏成favorite
      if (this.filteritem) {
        this.isFavorite = this.database.isFavorite(this.filteritem.Id);
      }
    });
  }

  ngOnInit() {
  }

  // return to home page
  linkHomePage() {
    this.router.navigate(['/homepage']);
  }

  // 增加数量
  increaseQuantity() {
    this.quantity++;
  }

  // 减少数量
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // 切换Favorite
  toggleFavorite() {
    if (this.filteritem) {
      if (this.isFavorite) {
        this.database.removeFavorite(this.filteritem.Id);
        this.isFavorite = false;
        this.showToast('Removed from favorites');
      } else {
        this.database.addFavorite(this.filteritem);
        this.isFavorite = true;
        this.showToast('Added to favorites');
      }
    }
  }

  // get ingredients list
  getIngredients(): string[] {
    if (this.filteritem && this.filteritem.Ingredientlist) {
      return this.filteritem.Ingredientlist.split(',').map((i: string) => i.trim());
    }
    return [];
  }

  // calculate total price
  getTotalPrice(): string {
    if (this.filteritem) {
      return (this.filteritem.Price * this.quantity).toFixed(2);
    }
    return '0.00';
  }

  // add to cart
  async addtocart() {
    if (this.filteritem) {
      this.database.AddToCart(
        this.filteritem.Id,
        this.filteritem.Image,
        this.filteritem.ProductName,
        this.filteritem.Price,
        this.filteritem.BackgroundColor,
        this.filteritem.Ingredientlist,
        this.filteritem.Description,
        this.quantity
      );

      // 显示成功message
      const alert = await this.alertController.create({
        header: 'Added to Cart!',
        message: `${this.quantity} x ${this.filteritem.ProductName} has been added to your cart.`,
        buttons: [
          {
            text: 'Continue Shopping',
            role: 'cancel',
            handler: () => {
              this.quantity = 1;
              this.router.navigate(['/homepage']);
            }
          },
          {
            text: 'View Cart',
            handler: () => {
              this.router.navigate(['/cartpage']);
            }
          }
        ]
      });

      await alert.present();
    }
  }

  // 显示 Toast 提示
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }

  // 加深颜色（渐变）
  darkenColor(color: string): string {
    return color;
  }
}