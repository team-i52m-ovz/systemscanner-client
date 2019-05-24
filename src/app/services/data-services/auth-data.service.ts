import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthApiService} from '../api-services/auth-api.service';

@Injectable()
export class AuthDataService {

  constructor(private _authApi: AuthApiService) {
  }

  public login(user: { username: string, password: string }): Observable<any> {
    return this._authApi.login(user);
  }
}
