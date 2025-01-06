import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-register',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email = '';
  password = '';
  allUsers: User[] | null = [];

  userService = inject(UserService);

  // constructor() {
  //   // this.userService.getRegisteredUsers();
  //   console.log(this.userService.users);
  //   // this.getAllUsers();
  // }

  getAllUsers() {
    this.userService.users.subscribe((data) => {
      console.log(data);
      this.allUsers = data;
    });
  }

  userRegistration() {
    this.userService.registerUser({
      email: this.email,
      password: this.password,
    });
    console.log('regComp,', this.email, this.password);
  }
}
