import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Staticlistservice } from '../Database/staticlistservice';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: false
})
export class HomepagePage implements OnInit {

  constructor(
    private router: Router,
    private database: Staticlistservice,
    private toastController: ToastController
  ) { }

  // original product list
  ProductList: {
    Id: number,
    Image: string,
    ProductName: string,
    Price: number,
    BackgroundColor: string,
    Ingredientlist: string,
    Description: string,
    category: string
  }[] = [];

  // products after filtering
  filteredProducts: any[] = [];

  // search query
  searchQuery: string = '';

  // selected category
  selectedCategory: string = 'All';

  // category list
  categories = [
    { name: 'All', icon: 'apps-outline' },
    { name: 'Pizza', icon: 'pizza-outline' },
    { name: 'Burger', icon: 'fast-food-outline' },
    { name: 'Sushi', icon: 'fish-outline' },
    { name: 'Ramen', icon: 'restaurant-outline' },
    { name: 'Bibimbap', icon: 'nutrition-outline' },
    { name: 'Dessert', icon: 'ice-cream-outline' }
  ];

  ngOnInit() {
    // load products from database service
    this.ProductList = this.database.getProduct();
    this.filteredProducts = [...this.ProductList];
  }

  ionViewWillEnter() {
    // 每次进入页面时refresh data
    this.applyFilters();
  }

  // search products
  onSearch() {
    this.applyFilters();
  }

  // clear search
  clearSearch() {
    this.searchQuery = '';
    this.applyFilters();
  }

  // filter by category
  filterByCategory(categoryName: string) {
    this.selectedCategory = categoryName;
    this.applyFilters();
  }

  // 应用所有filter
  applyFilters() {
    let results = [...this.ProductList];

    // 应用分类filter
    if (this.selectedCategory !== 'All') {
      results = results.filter(product =>
        product.category === this.selectedCategory  // ← 完整的category filter
      );
    }

    // search filter
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase().trim();
      results = results.filter(product =>
        product.ProductName.toLowerCase().includes(query) ||
        product.Description.toLowerCase().includes(query)
      );
    }

    this.filteredProducts = results;
  }

  // reset all filters
  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.filteredProducts = [...this.ProductList];
  }

  // check所有products
  viewAllDishes() {
    this.resetFilters();
    this.showToast('Showing all products');
  }

  // navigate to product details
  NavigateToProductDetails(Id: number) {
    this.router.navigate(['productdetailpage', Id]);
  }

  // 切换favorite status
  toggleFavorite(event: Event, product: any) {
    event.stopPropagation(); // prevent card click

    if (this.database.isFavorite(product.Id)) {
      this.database.removeFavorite(product.Id);
      this.showToast('Removed from favorites');
    } else {
      this.database.addFavorite(product);
      this.showToast('Added to favorites');
    }
  }

  // check是否已收藏
  isFavorite(productId: number): boolean {
    return this.database.isFavorite(productId);
  }

  // add to cart 快速添加
  quickAddToCart(event: Event, product: any) {
    event.stopPropagation(); // prevent card click

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

  // get cart item count
  getCartCount(): number {
    return this.database.GetCartItemCount();
  }

  // get favorites count
  getFavoritesCount(): number {
    return this.database.getFavoritesCount();
  }

  // bottom navigation
  navigateTo(page: string) {
    switch (page) {
      case 'home':
        break;
      case 'cart':
        this.router.navigate(['/cartpage']);
        break;
      case 'favorites':
        this.router.navigate(['/favoritespage']);
        break;
      case 'profile':
        this.router.navigate(['/profile']);
        break;
    }
  }

  // display toast message
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    await toast.present();
  }

  // go to transaction History
  goToTransactionHistory() {
    this.router.navigate(['/transaction-history']);
  }
}