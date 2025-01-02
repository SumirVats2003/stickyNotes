import { Component, Injectable } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
@Injectable({ providedIn: 'root' })
export class LoginComponent {
  email: string = '';
  password: string = '';

  handleSubmit(event: Event) {
    // event.preventDefault();
    console.log('Button clicked');
    console.log(this.email, this.password);
  }
}
