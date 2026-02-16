import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Database/auth.service';
import { ToastController } from '@ionic/angular';

export interface Transaction {
  id: string;
  date: Date;
  items: any[];
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: string;
  deliveryAddress: string;
}

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
  standalone: false,
})
export class TransactionHistoryPage implements OnInit {

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedFilter: string = 'all';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTransactions();
  }

  ionViewWillEnter() {
    this.authService.reloadData();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTransactions();
  }

  loadTransactions() {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    // 从 localStorage load users的transactions history
    const transactionsData = localStorage.getItem('userTransactions');
    if (transactionsData) {
      const allTransactions = JSON.parse(transactionsData);
      this.transactions = allTransactions[userId] || [];
    } else {
      this.transactions = [];
    }

    this.filterTransactions();
  }

  filterTransactions() {
    if (this.selectedFilter === 'all') {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter(
        t => t.status === this.selectedFilter
      );
    }
  }

  onFilterChange(event: any) {
    this.selectedFilter = event.detail.value;
    this.filterTransactions();
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  formatTime(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getItemCount(transaction: Transaction): number {
    return transaction.items.reduce((total, item) => total + item.Quantity, 0);
  }

  viewTransactionDetail(transaction: Transaction) {
    // 可以导航到详细页面
    this.showToast('Transaction detail view coming soon', 'primary');
  }

  goBack() {
    this.router.navigate(['/homepage']);
  }

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    await toast.present();
  }

}
