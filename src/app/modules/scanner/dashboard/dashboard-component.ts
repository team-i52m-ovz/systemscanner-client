import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {NewInstanceComponent} from './dialog/new-instance-component';
import {MatDialog} from '@angular/material';
import {ScannerInstanceDataService} from '../../../services/data-services/scanner-instance-data.service';
import {INewInstanse} from '../../../models/interfaces/new-instanse.interface';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard-component.html',
  styleUrls: ['dashboard-component.scss'],
})
export class DashboardComponent {
  instances: string[];

  constructor(private scannerInstanceDS: ScannerInstanceDataService,
              private router: Router,
              public dialog: MatDialog) {
    this.scannerInstanceDS.findScannerInstances()
      .subscribe(res => {
        this.instances = res;
      });
  }

  public addNewInstance(newInstance: INewInstanse): void {
    this.scannerInstanceDS.addNewScannerInstance(newInstance)
      .pipe(
        switchMap(() => this.scannerInstanceDS.findScannerInstances())
      ).subscribe(resp => {
      this.instances = resp;
    });
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(NewInstanceComponent);

    dialogRef.afterClosed().subscribe((result: INewInstanse) => {
      if (result) {
        this.addNewInstance(result);
      }
    });
  }

  public showReport(instance: string): void {
    this.router.navigate(['/scanner/report', instance]).then();
  }

  public logout(): Promise<any> {
    localStorage.clear();
    return this.router.navigate(['login']);
  }
}
