import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../base-url';
import { ManagerService } from './manager.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = BASE_URL;
  userName: string;
  userId: string;
  sessionKey: string;
  sessionId: string;
  loginState: boolean = false;

  constructor(private http: HttpClient,
    private managerService: ManagerService,
    private router: Router) {

    this.subscribeForLoginStateUpdates();

  }

  login(formValue) {
    const data = {
      username: formValue.login,
      password: formValue.password
    };

    return this.http.post(`${this.baseUrl}api/auth/login`, { data: data })
      .pipe(
        map((res) => {
          if (res['data']['id']) {
            this.saveToLocalStorage( res['data']['session_key'],
              res['data']['name'],
              String(res['data']['id']));
            this.loginState = true;
            this.router.navigate(['home']);
            return true;
          } else {
            return false;
          }
        }),
        catchError(this.managerService.handleError)
      );
  }

  isLoggedIn() {
    this.fetchLocalStorage();
    if (this.sessionKey && this.userName && this.userId) {
      const data = {
        session_key: this.sessionKey
      };

      return this.http.post(`${this.baseUrl}api/auth/is-logged`, { data: data })
        .pipe(
          map((res) => {
            if (res['data']['session_id'] && String(res['data']['user_id']) == this.userId) {
              localStorage.setItem('flashcards_session_id', res['data']['session_id']);
              return true;
            } else {
              console.log('not logged in');
              return false;
            }
          }),
          catchError(this.managerService.handleError)
        );
    } else {
      return of(false);
    }
  }

  subscribeForLoginStateUpdates() {
    this.isLoggedIn().subscribe(res => {
      this.loginState = res;
    });
  }

  logout() {
    this.fetchLocalStorage();
    const data = {
      session_id: this.sessionId,
      session_key: this.sessionKey
    };
    return this.http.post(`${this.baseUrl}api/auth/logout`, { data: data })
      .pipe(
        map((res) => {
          this.resetLocalStorage();
          this.resetProperties();
          this.loginState = false;
          this.router.navigate(['login']);
          return res;
        }),
        catchError(this.managerService.handleError)
      );
  }

  signup(formValue) {
    const data = {
      username: formValue.login,
      password: formValue.password,
      email: formValue.email
    };

    return this.http.post(`${this.baseUrl}api/auth/signup`, { data: data })
      .pipe(
        map((res) => {
        if (res['data'] === 'existing user') {
          return 'existing user';
        } else if (res['data']['id']) {
          this.saveToLocalStorage(res['data']['session_key'],
            res['data']['name'],
            String(res['data']['id']));
          this.loginState = true;
          this.router.navigate(['home']);
          return true;
        } else {
          return false;
        }
        }),
        catchError(this.managerService.handleError)
      );
  }

  saveToLocalStorage(key, name, id) {
    localStorage.setItem('flashcards_session_key', key);
    localStorage.setItem('flashcards_user_name', name);
    localStorage.setItem('flashcards_user_id', id);
  }

  fetchLocalStorage() {
    this.sessionKey = localStorage.getItem('flashcards_session_key');
    this.sessionId = localStorage.getItem('flashcards_session_id') || '';
    this.userName = localStorage.getItem('flashcards_user_name');
    this.userId = localStorage.getItem('flashcards_user_id');
  }

  resetLocalStorage() {
    localStorage.setItem('flashcards_session_key', '');
    localStorage.setItem('flashcards_session_id', '')
    localStorage.setItem('flashcards_user_name', '');
    localStorage.setItem('flashcards_user_id', '');
  }

  resetProperties() {
    this.userName = '';
    this.userId = '';
    this.sessionKey = '';
    this.sessionId = '';
  }
}
