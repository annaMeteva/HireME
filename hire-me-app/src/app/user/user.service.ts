import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: UserForAuth | undefined;
  userSubscription: Subscription;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage();
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  private loadUserFromLocalStorage(): void {
    const accessToken = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const user_id = localStorage.getItem('userId');

    if (accessToken && email && name && user_id) {

      this.user$$.next({ email, companyName: name, user_id, accessToken });

    } else {
      this.user$$.next(undefined);
    }
  }
  register(email: string,
    companyName: string,
    phone: string,
    address: string,
    regNum: string,
    password: string,
    password2: string) {
    return this.http.post<{ email: string, name: string, user_id: string, accessToken: string }>('/api/users/register', { email, companyName, phone, address, regNum, password, password2 }).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);

        localStorage.setItem('email', res.email);
        localStorage.setItem('name', res.name);
        localStorage.setItem('userId', res.user_id);
        this.user$$.next({
          email: res.email,
          companyName: res.name,
          user_id: res.user_id,
          accessToken: res.accessToken
        });
      }))
  }

  login(email: string, password: string) {
    return this.http.post<{ email: string, name: string, user_id: string, accessToken: string }>('/api/users/login', { email, password }).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);

        localStorage.setItem('email', res.email);
        localStorage.setItem('name', res.name);
        localStorage.setItem('userId', res.user_id);
        this.user$$.next({
          email: res.email,
          companyName: res.name,
          user_id: res.user_id,
          accessToken: res.accessToken
        });
      })
    );
  }

  logout() {
    return this.http.get('/api/users/logout', {})
      .pipe(tap(() => {
        localStorage.clear();
        console.log("hete")
        this.user$$.next(undefined);
      }));
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
