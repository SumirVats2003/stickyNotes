import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../user';
import { BoldDirective } from '../../directives/bold.directive';

@Component({
  selector: 'app-allusers',
  imports: [BoldDirective],
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.css',
})
export class AllusersComponent {
  allUsers: User[] | null = [];
  // userService = inject(UserService);

  constructor(private userService: UserService) {
    this.userService.getRegisteredUsers();
    this.userService.users.subscribe((data) => {
      if (data) this.allUsers = data;
    });
  }
}
