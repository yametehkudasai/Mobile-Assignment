import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Staticlistservice } from '../Database/staticlistservice';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.page.html',
  styleUrls: ['./cartpage.page.scss'],
  standalone: false,
})
export class CartpagePage implements OnInit {

  DisplayCart: {
    CartId: number,
    ProductId: number,
    ProductName: string,
    Price: number,
    Image: string,
    Description: string,
    BackgroundColor: string,
    Ingredientlist: string,
    Quantity: number
  }[] = []

  constructor(
    private database: Staticlistservice,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.DisplayCart = this.database.GetCardList();
  }

  goBack() {
    this.router.navigate(['/homepage']);
  }

  increaseQuantity(cartId: number) {
    const item = this.DisplayCart.find(x => x.CartId === cartId);
    if (item) {
      this.database.UpdateCartQuantity(cartId, item.Quantity + 1);
      this.loadCart();
    }
  }

  decreaseQuantity(cartId: number) {
    const item = this.DisplayCart.find(x => x.CartId === cartId);
    if (item) {
      if (item.Quantity > 1) {
        this.database.UpdateCartQuantity(cartId, item.Quantity - 1);
        this.loadCart();
      } else {
        this.confirmRemoveItem(cartId);
      }
    }
  }

  async confirmRemoveItem(cartId: number) {
    const alert = await this.alertController.create({
      header: 'Remove Item',
      message: 'Remove this item from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => {
            this.removeItem(cartId);
          }
        }
      ]
    });

    await alert.present();
  }

  async removeItem(cartId: number) {
    this.database.RemoveFromCart(cartId);
    this.loadCart();

    const toast = await this.toastController.create({
      message: 'Item removed from cart',
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }

  async clearCart() {
    if (this.DisplayCart.length === 0) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Clear Cart',
      message: 'Remove all items from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear All',
          role: 'destructive',
          handler: () => {
            this.database.ClearCart();
            this.loadCart();
            this.showToast('Cart cleared');
          }
        }
      ]
    });

    await alert.present();
  }

  // 修复: 使用正确的大写属性名 Price 和 Quantity
  getItemTotal(item: any): string {
    return (item.Price * item.Quantity).toFixed(2);
  }

  getSubtotal(): string {
    return this.database.GetCartTotal().toFixed(2);
  }

  getDeliveryFee(): string {
    return this.DisplayCart.length > 0 ? '5.00' : '0.00';
  }

  getTax(): string {
    return (this.database.GetCartTotal() * 0.1).toFixed(2);
  }

  getTotal(): string {
    const subtotal = this.database.GetCartTotal();
    const tax = subtotal * 0.1;
    const delivery = this.DisplayCart.length > 0 ? 5.00 : 0;
    return (subtotal + tax + delivery).toFixed(2);
  }

  async proceedToCheckout() {
    if (this.DisplayCart.length === 0) {
      this.showToast('Your cart is empty');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Checkout',
      message: `Total: $${this.getTotal()}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm Order',
          handler: () => {
            this.completeOrder();
          }
        }
      ]
    });

    await alert.present();
  }

  async completeOrder() {
    // 清空购物车
    this.database.ClearCart();
    this.loadCart();

    // 显示成功消息
    const alert = await this.alertController.create({
      header: 'Order Placed!',
      message: 'Your order has been placed successfully.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/homepage']);
          }
        }
      ]
    });

    await alert.present();
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