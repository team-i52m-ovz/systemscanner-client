import { HttpClient, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonHttp } from '../models/constants/constants';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthDataService {
  private api: string;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.api = environment.scannerApi;
  }

  login(user: { username: string, password: string }): Observable<any> {
    return this.httpClient.post<HttpResponse<any>>(`${this.api}auth/login`, user, {observe: 'response'})
      .pipe(
        map((res: HttpHeaderResponse) =>
          localStorage.setItem(CommonHttp.headers.auth, res.headers.get(CommonHttp.headers.auth)))
      );
  }
}
