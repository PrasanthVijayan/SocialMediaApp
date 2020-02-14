import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string
  password: string
  name: string
  age: number
  sex: string
  description: string
  registeredUser: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.registeredUser = {
      email: this.email,
      password: this.password,
      name: this.name,
      age: this.age,
      sex: this.sex,
      description: this.description
    }
    console.log('Register data', this.registeredUser);
    this.authService.registerUser(this.registeredUser)
      .subscribe(res => { 
        this.authService.setToken(res.token);
        this.router.navigate(['/', 'login']) 
      });


  }

}
