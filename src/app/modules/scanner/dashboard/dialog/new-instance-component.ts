import {MatDialogRef} from '@angular/material';
import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-instance-component',
  templateUrl: 'new-instance-component.html',
  styleUrls: ['./new-instance-component.scss']
})
export class NewInstanceComponent {

  public formInput: FormGroup;

  constructor(private _fb: FormBuilder,
              public dialogRef: MatDialogRef<NewInstanceComponent>) {
    this.formInput = this._fb.group({
      name: new FormControl('',
        [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)]),
      pid: new FormControl('',
        [Validators.required,
          Validators.minLength(30),
          Validators.maxLength(50)]),
      token: new FormControl('',
        [Validators.required,
          Validators.minLength(30),
          Validators.maxLength(50)])
    });
  }

  public onSubmit(): void {
    if (this.formInput.valid) {
      this.dialogRef.close({
        name: this.formInput.controls['name'].value,
        pid: this.formInput.controls['pid'].value,
        token: this.formInput.controls['token'].value
      });
    }
  }

}
