import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/shared/interfaces/article';
import { IComment } from 'src/app/shared/interfaces/comment';
import { IUser } from 'src/app/shared/interfaces/user';
import { environment } from '../../../environments/environment';

const apiURL = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${apiURL}/users/login`, {
      email,
      password
    }, httpOptions);
  }

  register(email: string, firstname: string, lastname: string, personalinfo: string, password: string): Observable<any> {
    return this.http.post(`${apiURL}/users/register`, {
      email,
      firstname,
      lastname,
      personalinfo,
      password
    }, httpOptions);
  }

  logout(token: string): Observable<any> {
    return this.http.post(`${apiURL}/users/logout`, {
      token
    }, httpOptions);
  }

  getProfile(profileId: string) {
    return this.http.get<IUser>(`${apiURL}/users/${profileId}`)
  }

  updateProfile(profileId: string, profile: object) {
    return this.http.put(`${apiURL}/users/${profileId}`,profile)
  }
}
