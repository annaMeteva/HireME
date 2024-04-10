import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ProfileDetails, User, UserForAuth } from '../types/user';
import { HttpClient, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
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
  get getCurUserEmail(): string {
    return this.user?.email || "";
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
    const companyName = localStorage.getItem('companyName');
    const _id = localStorage.getItem('_id');

    if (accessToken && email && companyName && _id) {

      this.user$$.next({ email, companyName: companyName, _id, accessToken });

    } else {
      this.user$$.next(undefined);
    }
  }
  getProfileDetails() {
    return this.http.get<ProfileDetails>('/api/users/me');
  }
  updateProfile(email: string,
    companyName: string,
    phoneNumber: string,
    address: string,
    regNum: string) {
    return this.http
      .put<UserForAuth>('/api/users/me', {
        email,
        companyName,
        phoneNumber,
        address,
        regNum
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }
  register(email: string,
    companyName: string,
    phoneNumber: string,
    address: string,
    regNum: string,
    password: string,
    password2: string) {
    return this.http.post<{ email: string, companyName: string, _id: string, accessToken: string }>('/api/users/register', { email, companyName, phoneNumber, address, regNum, password, password2 }).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);

        localStorage.setItem('email', res.email);
        localStorage.setItem('companyName', res.companyName);
        localStorage.setItem('_id', res._id);
        this.user$$.next({
          email: res.email,
          companyName: res.companyName,
          _id: res._id,
          accessToken: res.accessToken
        });
      }))
  }

  login(email: string, password: string) {
    return this.http.post<{ email: string, companyName: string, _id: string, accessToken: string }>('/api/users/login', { email, password }).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('email', res.email);
        localStorage.setItem('companyName', res.companyName);
        localStorage.setItem('_id', res._id);
        this.user$$.next({
          email: res.email,
          companyName: res.companyName,
          _id: res._id,
          accessToken: res.accessToken
        });
      })
    );
  }

  logout() {
    return this.http
      .get('/api/users/logout', {})
    // .pipe(tap((response) => {
    //   if (response.status === 204 && !response.headers.has('Content-Type')) {
    //   localStorage.removeItem(this.key)
    //   } else {
    //   throw response
    //   }
    //   }));
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
