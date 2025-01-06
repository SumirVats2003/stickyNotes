import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todoform',
  imports: [FormsModule],
  templateUrl: './todoform.component.html',
  styleUrl: './todoform.component.css',
})
export class TodoformComponent {
  title: string = '';
  desc: string = '';
  userId = localStorage.getItem('userId');

  constructor(private userService: UserService) {}

  handleSubmit() {
    if (this.userId === null) return;
    console.log(this.title);
    console.log(this.desc);

    const todoObj = {
      title: this.title,
      description: this.desc,
      color: '#fff',
      userId: this.userId,
    };
    this.userService.addTodo(todoObj);
  }
}
