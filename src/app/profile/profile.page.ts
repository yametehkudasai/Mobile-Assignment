import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserProfile } from '../Database/auth.service';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  userProfile: UserProfile | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProfile();
  }

  // 每次进入page时重新loading
  ionViewWillEnter() {
    // 强制从localStorage重新loading data
    this.authService.reloadData();
    
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProfile();
  }

  loadProfile() {
    this.userProfile = this.authService.getCurrentUserProfile();
  }

  goBack() {
    this.router.navigate(['/homepage']);
  }

  async changeAvatar() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Change Avatar',
      buttons: [
        {
          text: 'Avatar 1',
          handler: () => {
            this.updateAvatar('https://api.dicebear.com/7.x/avataaars/svg?seed=1');
          }
        },
        {
          text: 'Avatar 2',
          handler: () => {
            this.updateAvatar('https://api.dicebear.com/7.x/avataaars/svg?seed=2');
          }
        },
        {
          text: 'Avatar 3',
          handler: () => {
            this.updateAvatar('https://api.dicebear.com/7.x/avataaars/svg?seed=3');
          }
        },
        {
          text: 'Avatar 4',
          handler: () => {
            this.updateAvatar('https://api.dicebear.com/7.x/avataaars/svg?seed=4');
          }
        },
        {
          text: 'Avatar 5',
          handler: () => {
            this.updateAvatar('https://api.dicebear.com/7.x/avataaars/svg?seed=5');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  updateAvatar(avatar: string) {
    this.authService.updateAvatar(avatar);
    this.loadProfile();
    this.showToast('Avatar updated successfully', 'success');
  }

  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Edit Profile',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Full Name',
          value: this.userProfile?.name
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Phone Number',
          value: this.userProfile?.phone
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Address',
          value: this.userProfile?.address
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            if (data.name) {
              this.authService.updateProfile(data.name, data.phone, data.address);
              this.loadProfile();
              this.showToast('Profile updated successfully', 'success');
              return true;
            } else {
              this.showToast('Name is required', 'warning');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      inputs: [
        {
          name: 'oldPassword',
          type: 'password',
          placeholder: 'Current Password'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password'
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm New Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Change',
          handler: (data) => {
            if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
              this.showToast('Please fill all fields', 'warning');
              return false;
            }

            if (data.newPassword !== data.confirmPassword) {
              this.showToast('New passwords do not match', 'danger');
              return false;
            }

            const result = this.authService.changePassword(data.oldPassword, data.newPassword);

            if (result.success) {
              this.showToast(result.message, 'success');
              return true;
            } else {
              this.showToast(result.message, 'danger');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // check所有account（只有admin能用）
  viewAllAccounts() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/account-list']);
    } else {
      this.showToast('Access denied: Admin only', 'danger');
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          handler: () => {
            this.authService.logout();
            this.showToast('Logged out successfully', 'success');
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
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