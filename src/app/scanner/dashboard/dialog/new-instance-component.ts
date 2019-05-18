import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { ScannerInstance } from '../../../models/entities/scanner-instance';

@Component({
  selector: 'app-new-instance-component',
  templateUrl: 'new-instance-component.html',
})
export class NewInstanceComponent {

  constructor(
    public dialogRef: MatDialogRef<NewInstanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScannerInstance) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
