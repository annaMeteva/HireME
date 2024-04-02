import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: UserForAuth | undefined;
  USER_KEY = '[user]';

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor() {
    try {
      const lsUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(lsUser);
    } catch (error) {
      this.user = undefined;
    }
  }

  login(inputEmail: string, inputPassword: string) {
    this.user = {
      email: inputEmail,
      password: inputPassword,
      companyName: "Test",
      phoneNumber: "123-456-678",
      address: "Test address",
      regNumber: "09287478993",
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user));
  }



  logout() {
    this.user = undefined;
    localStorage.removeItem(this.USER_KEY);
  }
}
