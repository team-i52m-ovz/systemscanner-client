import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {CommonHttp} from '../../models/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate() {
    if (Boolean(localStorage.getItem('isAdmin'))) {
      return true;
    } else {
      this.router.navigate(['scanner']).then();
      return false;
    }
  }
}
