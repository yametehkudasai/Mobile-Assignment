import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Database/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/homepage']);
    }
  }

  async register() {
    // validate inputs
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      await this.showToast('Please fill all fields', 'warning');
      return;
    }

    if (!this.validateEmail(this.email)) {
      await this.showToast('Please enter a valid email', 'warning');
      return;
    }

    if (this.password.length < 6) {
      await this.showToast('Password must be at least 6 characters', 'warning');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showToast('Passwords do not match', 'danger');
      return;
    }

    // 用注册service
    const result = this.authService.register(this.email, this.password, this.name);

    if (result.success) {
      await this.showToast('Account created successfully!', 'success');
      this.router.navigate(['/homepage']);
    } else {
      await this.showToast(result.message, 'danger');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async socialRegister(provider: string) {
    await this.showToast(`${provider} registration coming soon`, 'primary');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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