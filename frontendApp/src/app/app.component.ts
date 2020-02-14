import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service'
import { Router, Route } from '@angular/router'

@Component({
  selector: 'app-root',
  template: `
      <mat-toolbar color="primary">
        <button routerLink="/home" mat-button>Fakebook</button>
        <span style="flex: 1 1 auto"></span>
        <button *ngIf="!authService.isAuthenticated" routerLink="/register" mat-button>Register</button>
        <button *ngIf="!authService.isAuthenticated" routerLink="/login" mat-button>Login</button>
        <button *ngIf="authService.isAuthenticated" mat-button (click)="logOff()">Log off</button>
        <button *ngIf="authService.isAuthenticated" mat-button routerLink="users">Users</button>
        <!-- <button routerLink="/messages" mat-button>Message</button> -->
      </mat-toolbar>
        <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(){
    
  }

  logOff(){
    localStorage.clear();
    this.router.navigate(['/','login']);
  }
  
}
