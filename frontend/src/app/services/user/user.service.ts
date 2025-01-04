import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private allUsers$ = new BehaviorSubject<User[]>([]);
  constructor(private http: HttpClient) {
    console.log('UserService Created');
  }

  users = this.allUsers$.asObservable();

  getRegisteredUsers() {
    console.log('getting users');
    this.http
      .get<User[]>('http://localhost:5000/allusers')
      .subscribe((config) => {
        console.log(config);
        this.allUsers$.next(config);
      });
  }

  registerUser(newUser: any) {
    this.http
      .post('http://localhost:5000/register', newUser)
      .subscribe((config) => {
        console.log(newUser);
        console.log('updated config:', this.allUsers$);
        console.log('updated list:', this.allUsers$.value);
      });
  }
}
