import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { ErrorService } from './error/error.service';

const { apiUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    API = '/api';

    constructor(private errorService: ErrorService, private router: Router) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const accessToken = localStorage.getItem('accessToken');

        if (req.url.startsWith(this.API)) {
            req = req.clone({
                url: req.url.replace(this.API, apiUrl),
            });
        }
        if (req.url.startsWith('http://localhost:3030') && accessToken) {
            req = req.clone({
                setHeaders: {
                    "X-Authorization": accessToken
                }
            });
        }
        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(req).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.router.navigate(['/auth/login']);
                } if (err.status === 403) {
                    localStorage.clear();
                    this.router.navigate(['/']);
                }
                if (err.status === 404) {
                    this.router.navigate(['/']);
                } else {
                    this.errorService.setError(err);
                    this.router.navigate(['/error']);
                }

                return [err];
            })
        );
    }
}

export const appInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS,
};