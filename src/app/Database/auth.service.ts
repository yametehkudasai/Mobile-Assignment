import { Injectable } from '@angular/core';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  avatar: string;
  createdAt: Date;
  isAdmin?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  avatar: string;
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private users: User[] = [];
  private currentUser: User | null = null;
  private userCarts: { [userId: string]: any[] } = {};
  private userFavorites: { [userId: string]: any[] } = {};

  // 固定的admin account
  private readonly ADMIN_EMAIL = 'admin@foodapp.com';
  private readonly ADMIN_PASSWORD = 'admin123';

  constructor() {
    this.loadData();
    this.ensureAdminExists();
  }

  // 确保admin account存在
  private ensureAdminExists() {
    const adminExists = this.users.find(u => u.email === this.ADMIN_EMAIL);
    if (!adminExists) {
      const admin: User = {
        id: 'admin-' + Date.now(),
        email: this.ADMIN_EMAIL,
        password: this.ADMIN_PASSWORD,
        name: 'Administrator',
        phone: '',
        address: '',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        createdAt: new Date(),
        isAdmin: true
      };
      this.users.push(admin);
      this.saveData();
    }
  }

  register(email: string, password: string, name: string): { success: boolean, message: string } {
    if (!email || !password || !name) {
      return { success: false, message: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    // 禁止register admin email
    if (email.toLowerCase() === this.ADMIN_EMAIL) {
      return { success: false, message: 'This email is reserved' };
    }

    if (this.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'Email already exists' };
    }

    const newUser: User = {
      id: this.generateId(),
      email: email.toLowerCase(),
      password: password,
      name: name,
      phone: '',
      address: '',
      avatar: this.getRandomAvatar(),
      createdAt: new Date(),
      isAdmin: false
    };

    this.users.push(newUser);
    this.userCarts[newUser.id] = [];
    this.userFavorites[newUser.id] = [];
    this.currentUser = newUser;
    this.saveData();

    return { success: true, message: 'Registration successful' };
  }

  login(email: string, password: string): { success: boolean, message: string } {
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    const user = this.users.find(u =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      this.currentUser = user;
      if (!this.userCarts[user.id]) this.userCarts[user.id] = [];
      if (!this.userFavorites[user.id]) this.userFavorites[user.id] = [];
      this.saveData();
      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid email or password' };
  }

  logout() {
    this.currentUser = null;
    this.saveData();
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // check是不是admin
  isAdmin(): boolean {
    return this.currentUser?.isAdmin === true;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentUserId(): string | null {
    return this.currentUser ? this.currentUser.id : null;
  }

  getCurrentUserProfile(): UserProfile | null {
    if (!this.currentUser) return null;
    return {
      id: this.currentUser.id,
      email: this.currentUser.email,
      name: this.currentUser.name,
      phone: this.currentUser.phone,
      address: this.currentUser.address,
      avatar: this.currentUser.avatar,
      isAdmin: this.currentUser.isAdmin
    };
  }

  updateProfile(name: string, phone: string, address: string): boolean {
    if (!this.currentUser) return false;
    this.currentUser.name = name;
    this.currentUser.phone = phone;
    this.currentUser.address = address;
    const index = this.users.findIndex(u => u.id === this.currentUser!.id);
    if (index !== -1) this.users[index] = this.currentUser;
    this.saveData();
    return true;
  }

  updateAvatar(avatar: string): boolean {
    if (!this.currentUser) return false;
    this.currentUser.avatar = avatar;
    const index = this.users.findIndex(u => u.id === this.currentUser!.id);
    if (index !== -1) this.users[index] = this.currentUser;
    this.saveData();
    return true;
  }

  changePassword(oldPassword: string, newPassword: string): { success: boolean, message: string } {
    if (!this.currentUser) return { success: false, message: 'Not logged in' };
    if (this.currentUser.password !== oldPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }
    if (newPassword.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters' };
    }
    this.currentUser.password = newPassword;
    const index = this.users.findIndex(u => u.id === this.currentUser!.id);
    if (index !== -1) this.users[index] = this.currentUser;
    this.saveData();
    return { success: true, message: 'Password changed successfully' };
  }

  // ==========================================
  // Forgot Password 功能
  // ==========================================
  resetPassword(email: string, newPassword: string): { success: boolean, message: string } {
    if (!email || !newPassword) {
      return { success: false, message: 'Email and new password are required' };
    }

    if (newPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }

    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, message: 'Email not found' };
    }

    // 不允许reset admin password
    if (user.isAdmin) {
      return { success: false, message: 'Cannot reset admin password' };
    }

    user.password = newPassword;
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) this.users[index] = user;
    this.saveData();

    return { success: true, message: 'Password reset successfully' };
  }

  // check email是否存在
  checkEmailExists(email: string): boolean {
    return this.users.some(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserCart(): any[] {
    if (!this.currentUser) return [];
    return this.userCarts[this.currentUser.id] || [];
  }

  setUserCart(cart: any[]) {
    if (!this.currentUser) return;
    this.userCarts[this.currentUser.id] = cart;
    this.saveData();
  }

  clearUserCart() {
    if (!this.currentUser) return;
    this.userCarts[this.currentUser.id] = [];
    this.saveData();
  }

  getUserFavorites(): any[] {
    if (!this.currentUser) return [];
    return this.userFavorites[this.currentUser.id] || [];
  }

  setUserFavorites(favorites: any[]) {
    if (!this.currentUser) return;
    this.userFavorites[this.currentUser.id] = favorites;
    this.saveData();
  }

  clearUserFavorites() {
    if (!this.currentUser) return;
    this.userFavorites[this.currentUser.id] = [];
    this.saveData();
  }

  // 强制重新load data
  reloadData() {
    this.loadData();
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  private getRandomAvatar(): string {
    const avatars = [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=5'
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  private saveData() {
    localStorage.setItem('users', JSON.stringify(this.users));
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
    localStorage.setItem('userCarts', JSON.stringify(this.userCarts));
    localStorage.setItem('userFavorites', JSON.stringify(this.userFavorites));
  }

  private loadData() {
    const usersData = localStorage.getItem('users');
    if (usersData) this.users = JSON.parse(usersData);

    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) this.currentUser = JSON.parse(currentUserData);

    const cartsData = localStorage.getItem('userCarts');
    if (cartsData) this.userCarts = JSON.parse(cartsData);

    const favoritesData = localStorage.getItem('userFavorites');
    if (favoritesData) this.userFavorites = JSON.parse(favoritesData);
  }
}