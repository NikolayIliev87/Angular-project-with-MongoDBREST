import { Injectable } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user';
import { AuthService } from './auth.service'

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private authService: AuthService) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: IUser): void {
    window.sessionStorage.removeItem(USER_KEY);
    this.authService.getProfile(user._id).subscribe(
      (profile : IUser) => window.sessionStorage.setItem(USER_KEY, JSON.stringify(profile)))
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
      // return user;
    }
    return {};
  }
}
