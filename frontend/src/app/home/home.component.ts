import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { TodoformComponent } from '../todoform/todoform.component';
import { TodolistComponent } from '../todolist/todolist.component';
import { UserService } from '../services/user/user.service';
import { Todos } from '../user';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NavbarComponent, TodoformComponent, TodolistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userId = localStorage.getItem('userId');
  isUserLoggedIn = this.userId ? true : false;
  todos: Todos[] | null = [];

  constructor(private userService: UserService) {}

  ngOnInit() {}
}
