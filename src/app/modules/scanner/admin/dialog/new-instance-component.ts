import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {INewInstance, IUser} from '../../../../models/interfaces/new-instanse.interface';

@Component({
  selector: 'app-new-instance-component',
  templateUrl: 'new-instance-component.html',
  styleUrls: ['./new-instance-component.scss']
})
export class NewInstanceComponent implements OnInit {

  @Input() isEdit: boolean;

  public formInput: FormGroup;
  public usersList: any[];
  public compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  constructor(private _fb: FormBuilder,
              public dialogRef: MatDialogRef<NewInstanceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                usersList: IUser[],
                instance: INewInstance,
                isEdit: boolean
              }) {
  }

  private initEditForm(): any {
    return this._fb.group({
      name: new FormControl('',
        [Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)]),
      pid: new FormControl('',
        [Validators.required,
          Validators.minLength(30),
          Validators.maxLength(50)]),
      users: new FormControl([])
    });
  }

  private initCreationForm(): any {
    return this._fb.group({
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
          Validators.maxLength(50)]),
      users: new FormControl()
    });
  }

  ngOnInit(): void {
    if (this.data) {

      this.isEdit = this.data.isEdit;
      this.usersList = this.data.usersList;
      this.formInput = this.isEdit ? this.initEditForm() : this.initCreationForm();

      if (this.isEdit) {
        this.formInput.controls['name'].setValue(this.data.instance.name);
        this.formInput.controls['pid'].setValue(this.data.instance.pid);
        this.formInput.controls['users'].setValue(this.data.instance.users);
      }
    }
  }

  public onSubmit(): void {
    if (this.formInput.valid) {
      this.dialogRef.close({
        instance: this.formInput.value,
        isEdit: this.isEdit
      });
    }
  }

  public compareByValue(f1: any, f2: any): boolean {
    return f1 && f2 && f1.id === f2.id;
  }

}
