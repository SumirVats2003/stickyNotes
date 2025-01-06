import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private allUsers$ = new BehaviorSubject<User[] | null>(null);
  constructor(private http: HttpClient) {
    console.log('UserService Created');
  }

  users = this.allUsers$.asObservable();

  getRegisteredUsers() {
    // console.log('getting users');
    // this.http
    //   .get<User[]>('http://localhost:5000/allusers')
    //   .subscribe((config) => {
    //     console.log(config);
    //     this.allUsers$.next(config);
    //   });
    if (this.allUsers$.value === null) {
      console.log('Fetching data from backend');
      this.http
        .get<User[]>('https://stickynotes-wsqg.onrender.com/allusers')
        .subscribe({
          next: (users) => {
            console.log('Fetched users : ', users);
            this.allUsers$.next(users);
          },
          error: (error) => {
            console.log('Error fetching data : ', error);
          },
        });
    } else {
      console.log('users already fetched');
    }
  }

  registerUser(newUser: User) {
    this.http
      .post('https://stickynotes-wsqg.onrender.com/register', newUser)
      .subscribe({
        next: (response) => {
          console.log(newUser);
          const currentUsers = this.allUsers$.value || [];
          const updatedUsers = [...currentUsers, newUser];
          this.allUsers$.next(updatedUsers);
          console.log('updated config:', this.allUsers$);
          console.log('updated list:', this.allUsers$.value);
        },
        error: (error) => {
          console.log('Error registering user : ', error);
        },
      });
  }
}
