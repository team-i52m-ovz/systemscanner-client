import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CommonHttp} from '../../models/constants/constants';
import {Router} from '@angular/router';

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
            this.router.navigate(['login']).then();
            return of();
          }
        })
      );
  }
}
