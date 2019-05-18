import { Component } from '@angular/core';
import { ScannerInstanceDataService } from '../../services/scanner-instance-data-service';
import { Router } from '@angular/router';
import { NewInstanceComponent } from './dialog/new-instance-component';
import { MatDialog } from '@angular/material';
import { ScannerInstance } from '../../models/entities/scanner-instance';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard-component.html',
  styleUrls: ['dashboard-component.scss'],
})
export class DashboardComponent {
  instances: string[];

  constructor(private dataService: ScannerInstanceDataService, private router: Router, public dialog: MatDialog) {
    this.dataService.findScannerInstances()
      .subscribe(res => {
        this.instances = res;
      });
  }

  addNewInstance() {
    this.dataService.addNewScannerInstance()
      .subscribe(instance => this.openDialog(instance));
  }

  private openDialog(instance: ScannerInstance): void {
    const dialogRef = this.dialog.open(NewInstanceComponent, {
        width: '450px',
        data: instance
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('success');
      this.instances.push(instance.pid);
    });
  }

  logout() {
    localStorage.clear();
    return this.router.navigate(['login']);
  }
}
