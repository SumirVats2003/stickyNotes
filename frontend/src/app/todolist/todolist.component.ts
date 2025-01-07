import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Todos, TodosParam } from '../user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-todolist',
  imports: [CardComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent {
  userId = localStorage.getItem('userId');
  todos: Todos[] | null = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.userId) {
      this.userService.getAllNotes(this.userId);
      this.userService.todos.subscribe((data) => {
        this.todos = data;
        console.log(this.todos);
      });
    }
  }
}
