import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path: string = environment.path;
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY)
  }

  setToken(token){
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  get isAuthenticated(){
    return !!this.token;
  }

  registerUser(registeredUser) {
    return this.http.post<any>(this.path+'/register', registeredUser);      
  }

  loginUser(loggedInUser) {
    console.log('Inside server login func:', loggedInUser);
    return this.http.post<any>(this.path+'/login', loggedInUser);      
  }
}
