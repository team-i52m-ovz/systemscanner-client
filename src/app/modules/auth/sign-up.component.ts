import {Component, OnChanges, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import {AuthDataService} from '../../services/data-services/auth-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public hide: boolean;
  public userFormGroup: FormGroup;
  public error = '';
  public isLoaderShown: boolean;

  constructor(private _authDS: AuthDataService,
              private _router: Router) {
    this.hide = true;
    this.userFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.isLoaderShown = true;
    this.error = '';

    return this._authDS.login(this.userFormGroup.value)
      .pipe(
        catchError(err => {
            this.isLoaderShown = false;

            return this.error = err.message;
          }
        )
      )
      .subscribe((resp) => {
        console.log(resp.headers.get('Roles'));
        this.isLoaderShown = false;
        this._router.navigate(['home']).then();
      });
  }
}
