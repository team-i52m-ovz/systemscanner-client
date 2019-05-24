import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {CommonHttp} from '../../models/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private _api: string;

  constructor(private _httpClient: HttpClient) {
    this._api = environment.scannerApi;
  }

  public login(user: { username: string, password: string }): Observable<any> {
    return this._httpClient.post<HttpResponse<any>>(`${this._api}auth/login`, user, {observe: 'response'})
      .pipe(
        take(1),
        map(res =>
          localStorage.setItem(CommonHttp.headers.auth, res.headers.get(CommonHttp.headers.auth)))
      );
  }
}
