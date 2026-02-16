import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Database/auth.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // 清空form data
    this.clearForm();

    // 如果已经login，直接去到homepage
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/homepage']);
    }
  }

  // 每次进入page时清空form data
  ionViewWillEnter() {
    this.clearForm();
  }

  // 清空form data
  clearForm() {
    this.email = '';
    this.password = '';
    this.showPassword = false;
  }

  // login
  async login() {
    // validate inputs
    if (!this.email || !this.password) {
      await this.showToast('Please enter email and password', 'warning');
      return;
    }

    // validate email format
    if (!this.validateEmail(this.email)) {
      await this.showToast('Please enter a valid email', 'warning');
      return;
    }

    // 用认证服务
    const result = this.authService.login(this.email, this.password);

    if (result.success) {
      await this.showToast('Welcome back!', 'success');

      // 清空form data
      this.clearForm();

      // 所有users（包括admin）都nav到 Homepage
      this.router.navigate(['/homepage']);

      // 如果是admin，去到account list page，否则去homepage
      if (this.authService.isAdmin()) {
        this.router.navigate(['/account-list']);
      } else {
        this.router.navigate(['/homepage']);
      }
    } else {
      await this.showToast(result.message, 'danger');
    }
  }

  // show / hide password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // forgot password
  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Reset Password',
      message: 'Enter your email and new password',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Your email address'
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New password (min 6 characters)'
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'Confirm new password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset Password',
          handler: async (data) => {
            // validate inputs
            if (!data.email || !data.newPassword || !data.confirmPassword) {
              this.showToast('Please fill all fields', 'warning');
              return false;
            }

            if (!this.validateEmail(data.email)) {
              this.showToast('Please enter a valid email', 'warning');
              return false;
            }

            if (data.newPassword !== data.confirmPassword) {
              this.showToast('Passwords do not match', 'danger');
              return false;
            }

            if (data.newPassword.length < 6) {
              this.showToast('Password must be at least 6 characters', 'warning');
              return false;
            }

            // check email是否存在
            if (!this.authService.checkEmailExists(data.email)) {
              this.showToast('Email not found', 'danger');
              return false;
            }

            // reset password
            const result = this.authService.resetPassword(data.email, data.newPassword);

            if (result.success) {
              this.showToast('Password reset successfully! You can now login with your new password.', 'success');
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

  // social login placeholder
  async socialLogin(provider: string) {
    await this.showToast(`${provider} login coming soon`, 'primary');
  }

  // 去到register page
  goToRegister() {
    this.router.navigate(['/register']);
  }

  // validate email format
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // 显示提示message
  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'top',
      color: color
    });
    await toast.present();
  }
}