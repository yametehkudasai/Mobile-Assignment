import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../Database/auth.service';

interface AccountDisplay {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  avatar: string;
  createdAt: Date;
  isCurrentUser: boolean;
}

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
  standalone: false,
})
export class AccountListPage implements OnInit {

  accounts: AccountDisplay[] = [];
  showPasswords: boolean[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadAccounts();
  }

  // 每次进入page时重新loading
  ionViewWillEnter() {
    // 强制从localStorage重新loading data
    this.authService.reloadData();
    this.loadAccounts();
  }

  loadAccounts() {
    // 从 localStorage 读取所有users和当前users 的data
    const usersData = localStorage.getItem('users');
    const currentUserData = localStorage.getItem('currentUser');

    let users = [];
    let currentUser = null;

    if (usersData) {
      users = JSON.parse(usersData);
    }

    if (currentUserData) {
      currentUser = JSON.parse(currentUserData);
    }

    // 只显示normal user，filter掉admin account
    const regularUsers = users.filter((user: any) => !user.isAdmin);

    // 标记当前users
    this.accounts = regularUsers.map((user: any) => ({
      ...user,
      isCurrentUser: currentUser && user.id === currentUser.id
    }));

    // 初始化 password display states
    this.showPasswords = new Array(this.accounts.length).fill(false);
  }

  togglePassword(index: number) {
    this.showPasswords[index] = !this.showPasswords[index];
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  }

  async switchToAccount(account: AccountDisplay) {
    const alert = await this.alertController.create({
      header: 'Switch Account',
      message: `Switch to ${account.name}'s account?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Switch',
          handler: () => {
            // 更新当前users
            localStorage.setItem('currentUser', JSON.stringify(account));
            // update当前users
            this.authService.reloadData();
            this.showToast(`Switched to ${account.name}`, 'success');
            this.router.navigate(['/homepage']);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteAccount(account: AccountDisplay) {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      message: `Are you sure you want to delete ${account.name}'s account? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          cssClass: 'alert-button-danger',
          handler: () => {
            this.performDeleteAccount(account.id);
          }
        }
      ]
    });
    await alert.present();
  }

  performDeleteAccount(accountId: string) {
    // 从 localStorage 删除account
    const usersData = localStorage.getItem('users');
    if (usersData) {
      let users = JSON.parse(usersData);

      // check是不是admin account（双重保护）
      const userToDelete = users.find((u: any) => u.id === accountId);
      if (userToDelete && userToDelete.isAdmin) {
        this.showToast('Cannot delete admin account', 'danger');
        return;
      }

      // delete user account
      users = users.filter((u: any) => u.id !== accountId);
      localStorage.setItem('users', JSON.stringify(users));

      // 完整clear：delete该users的所有data
      this.cleanupUserData(accountId);

      // check delete 的是不是current user
      const currentUserData = localStorage.getItem('currentUser');
      if (currentUserData) {
        const currentUser = JSON.parse(currentUserData);

        // 如果delete的是current user
        if (currentUser.id === accountId) {
          
          // 如果当前user是admin，不需要logout，继续check list
          if (currentUser.isAdmin) {
            // admin delete自己的情况（照理讲是不会，因为已filter）
            this.showToast('Cannot delete yourself while logged in', 'danger');
            return;

          } else{
            // 普通users才需要logout
            localStorage.removeItem('currentUser');
          // 重新laod AuthService data
          this.authService.reloadData();
          this.showToast('Current user deleted. Please login again.', 'warning');
          this.router.navigate(['/login']);
          return;
          }
        }
      }

      // admin delete 其他users后，保持在current page
      this.authService.reloadData();
      this.showToast('Account deleted successfully', 'success');
      this.loadAccounts(); // 只refresh list, 不跳转 （没有 break, continue 之类的）
    }
  }

  // 完整clear user data
  private cleanupUserData(userId: string) {
    // clear cart
    const cartsData = localStorage.getItem('userCarts');
    if (cartsData) {
      try {
        const carts = JSON.parse(cartsData);
        delete carts[userId];
        localStorage.setItem('userCarts', JSON.stringify(carts));
      } catch (e) {
        console.error('Error cleaning cart data:', e);
      }
    }

    // clear favorites
    const favoritesData = localStorage.getItem('userFavorites');
    if (favoritesData) {
      try {
        const favorites = JSON.parse(favoritesData);
        delete favorites[userId];
        localStorage.setItem('userFavorites', JSON.stringify(favorites));
      } catch (e) {
        console.error('Error cleaning favorites data:', e);
      }
    }
  }

  async clearAllAccounts() {
    const alert = await this.alertController.create({
      header: 'Danger Zone',
      message: 'This will delete ALL user accounts (admin account will be preserved). Are you absolutely sure?',
      inputs: [
        {
          name: 'confirmation',
          type: 'text',
          placeholder: 'Type "DELETE ALL" to confirm'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete All Users',
          cssClass: 'alert-button-danger',
          handler: (data) => {
            if (data.confirmation === 'DELETE ALL') {
              this.performClearAll();
              return true;
            } else {
              this.showToast('Confirmation text incorrect', 'danger');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  performClearAll() {
    // 🔥 保留admin account，只delete普通users
    const usersData = localStorage.getItem('users');
    const adminIds: string[] = [];

    if (usersData) {
      let users = JSON.parse(usersData);

      // 只保留admin，并记录adminID
      const adminUsers = users.filter((u: any) => {
        if (u.isAdmin) {
          adminIds.push(u.id);
          return true;
        }
        return false;
      });

      localStorage.setItem('users', JSON.stringify(adminUsers));
    }

    // 完整清理：只保留admin的cart和favorites
    this.cleanupAllUserData(adminIds);

    this.showToast('All user accounts cleared (admin preserved)', 'success');
    this.loadAccounts();
  }

  // clear所有user data，只保留admin
  private cleanupAllUserData(adminIds: string[]) {
    // clear cart - 只保留admin的
    const cartsData = localStorage.getItem('userCarts');
    if (cartsData) {
      try {
        const carts = JSON.parse(cartsData);
        const newCarts: any = {};

        // 只保留admin的cart
        adminIds.forEach(adminId => {
          if (carts[adminId]) {
            newCarts[adminId] = carts[adminId];
          }
        });

        localStorage.setItem('userCarts', JSON.stringify(newCarts));
      } catch (e) {
        console.error('Error cleaning all carts:', e);
        localStorage.setItem('userCarts', JSON.stringify({}));
      }
    }

    // clear favorites - 只保留admin的
    const favoritesData = localStorage.getItem('userFavorites');
    if (favoritesData) {
      try {
        const favorites = JSON.parse(favoritesData);
        const newFavorites: any = {};

        // 只保留admin的favorites
        adminIds.forEach(adminId => {
          if (favorites[adminId]) {
            newFavorites[adminId] = favorites[adminId];
          }
        });

        localStorage.setItem('userFavorites', JSON.stringify(newFavorites));
      } catch (e) {
        console.error('Error cleaning all favorites:', e);
        localStorage.setItem('userFavorites', JSON.stringify({}));
      }
    }
  }

  goBack() {
    this.router.navigate(['/profile']);
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