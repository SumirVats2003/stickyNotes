import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  LoginResponse,
  Todos,
  TodosParam,
  TodosResponse,
  User,
} from '../../user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private allUsers$ = new BehaviorSubject<User[] | null>(null);
  private allTodos$ = new BehaviorSubject<Todos[] | null>(null);
  constructor(private http: HttpClient, private router: Router) {
    console.log('UserService Created');
  }

  users = this.allUsers$.asObservable();
  todos = this.allTodos$.asObservable();
  url = `https://stickynotes-wsqg.onrender.com`;

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
      this.http.get<User[]>(`${this.url}/allusers`).subscribe({
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
    this.http.post(`${this.url}/register`, newUser).subscribe({
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

  loginUser(user: User) {
    this.http.post<LoginResponse>(`${this.url}/login`, user).subscribe({
      next: (response) => {
        console.log('Login user called', response);
        if (response && response.user) {
          const user = response.user;
          localStorage.setItem('userId', user._id);
          localStorage.setItem('userName', user.email);
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.log('Error occured : ', error);
      },
    });
  }

  getAllNotes(userId: string) {
    this.http.get<Todos[]>(`${this.url}/${userId}`).subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.allTodos$.next(response);
          console.log(this.allTodos$.value);
        }
      },
    });
  }

  addTodo(todo: TodosParam) {
    console.log(todo);
    this.http
      .post<TodosResponse>(`${this.url}/${todo.userId}/newnote`, todo)
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.newNote) {
            const notes = this.allTodos$.value || [];
            const updatedNotes = [
              ...notes,
              { ...response.newNote, _id: response.newNote._id },
            ];
            this.allTodos$.next(updatedNotes);
            console.log(this.allTodos$.value);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteTodo(todoId: string) {
    console.log('todo to be deleted, ', todoId);
    this.http
      .delete(`${this.url}/${localStorage.getItem('userId')}/${todoId}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          const filteredData =
            this.allTodos$.value?.filter((item) => item._id != todoId) || [];
          this.allTodos$.next(filteredData);
        },
      });
  }
}
