import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-card',
  imports: [NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title = '';
  @Input() desc = '';
  @Input() color = '';
  @Input() todoId = '';

  constructor(private userService: UserService) {}

  deleteTodo() {
    this.userService.deleteTodo(this.todoId);
  }
}
