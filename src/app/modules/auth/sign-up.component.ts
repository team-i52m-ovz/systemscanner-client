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

  constructor(private _authDS: AuthDataService,
              private _router: Router) {
    this.hide = true;
    this.userFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.error = '';

    return this._authDS.login(this.userFormGroup.value)
      .pipe(
        catchError(
          err => this.error = err.message
        )
      )
      .subscribe(() => this._router.navigate(['home']));
  }
}
