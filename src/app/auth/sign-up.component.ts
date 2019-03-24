import { Component } from '@angular/core';
import { AuthDataService } from '../services/auth-data-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  hide = true;
  userFormGroup: FormGroup;
  error = '';

  constructor(private dataService: AuthDataService, private router: Router) {
    this.userFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.error = '';

    return this.dataService.login(this.userFormGroup.value)
      .pipe(
        catchError(
          err => this.error = err.message
        )
      )
      .subscribe(
        () => this.router.navigate(['home'])
      );
  }
}
