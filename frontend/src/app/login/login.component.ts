import { Component, Injectable } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  handleSubmit(event: Event) {
    // event.preventDefault();
    console.log('Button clicked');
    console.log(this.email, this.password);
    this.userService.loginUser({ email: this.email, password: this.password });
  }
}
