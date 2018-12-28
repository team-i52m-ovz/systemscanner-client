import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonHttp } from '../models/constants/constants';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authToken = localStorage.getItem(CommonHttp.headers.auth);
    let request = req;

    if (authToken) {
      request = req.clone({
        headers: req.headers.set(CommonHttp.headers.auth, authToken)
      });
    }

    return next.handle(request)
      .pipe(
        catchError(err => {
          if (err.status === 401 || err.status === 403) {
            localStorage.clear();
            return this.router.navigate(['login']);
          }
        })
      );
  }
}
