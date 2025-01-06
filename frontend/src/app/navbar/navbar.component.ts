import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userId = localStorage.getItem('userId');
  userName = localStorage.getItem('userName');

  constructor(private router: Router) {}

  logoutUser() {
    localStorage.setItem('userId', '');
    localStorage.setItem('userName', '');
    this.router.navigate(['/login']);
  }
}
