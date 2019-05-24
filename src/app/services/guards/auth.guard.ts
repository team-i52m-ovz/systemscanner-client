import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {CommonHttp} from '../../models/constants/constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  public canActivate() {
    if (localStorage.getItem(CommonHttp.headers.auth)) {
      return true;
    } else {
      this.router.navigate(['login']).then();
      return false;
    }
  }
}
