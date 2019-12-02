import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NewInstanceComponent} from './dialog/new-instance-component';
import {MatDialog, MatSidenav} from '@angular/material';
import {ScannerInstanceDataService} from '../../../services/data-services/scanner-instance-data.service';
import {INewInstance} from '../../../models/interfaces/new-instanse.interface';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard-component.html',
  styleUrls: ['dashboard-component.scss'],
})
export class DashboardComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  public instances: any[];
  public isLoaderShown: boolean;

  constructor(private scannerInstanceDS: ScannerInstanceDataService,
              private router: Router,
              public dialog: MatDialog) {
    this.isLoaderShown = true;
    this.scannerInstanceDS.findScannerInstances()
      .subscribe(res => {
        this.instances = res;
        this.isLoaderShown = false;
        this.sidenav.open().then();
      });
  }

  public toggleSidebar(): void {
    this.sidenav.toggle().then();
  }

  public addNewInstance(newInstance: INewInstance): void {
    this.isLoaderShown = true;
    this.scannerInstanceDS.addNewScannerInstance(newInstance)
      .pipe(
        switchMap(() => this.scannerInstanceDS.findScannerInstances())
      ).subscribe(resp => {
      this.instances = resp;
      this.isLoaderShown = false;
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(NewInstanceComponent);

    dialogRef.afterClosed().subscribe((result: INewInstance) => {
      if (result) {
        this.addNewInstance(result);
      }
    });
  }

  public showReport(instance: any): void {
    this.isLoaderShown = true;
    this.router.navigate(['/scanner/report', instance.pid]).then(() => {
      this.toggleSidebar();
      this.isLoaderShown = false;
    });
  }

  public logout(): Promise<any> {
    localStorage.clear();
    return this.router.navigate(['login']);
  }
}
