import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string
  password: string

  loggedInUser: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.token)
      this.router.navigate(['/','home'])
  }

  login() {
    this.loggedInUser = {
      email: this.email,
      password: this.password
    }
    this.authService.loginUser(this.loggedInUser)
    .subscribe(res => {
      console.log('Res from login service:', res);
      this.authService.setToken(res.token);
      this.router.navigate(['/','home']);
    });
  }
}
