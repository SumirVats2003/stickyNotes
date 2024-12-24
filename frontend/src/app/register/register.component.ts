import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
