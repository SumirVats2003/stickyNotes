import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  imports: [NgStyle, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title = '';
  @Input() desc = '';
  @Input() color = '';
  @Input() todoId = '';

  editable = false;
  editedTitle = '';
  editedDesc = '';

  constructor(private userService: UserService) {}

  deleteTodo() {
    this.userService.deleteTodo(this.todoId);
  }

  editTodo() {
    this.editable = true;
  }

  saveTodo() {
    this.userService.editTodo(
      {
        description: this.desc,
        title: this.title,
        color: this.color,
        userId: localStorage.getItem('userId') || '',
      },
      this.todoId
    );
    this.editable = false;
  }
}
