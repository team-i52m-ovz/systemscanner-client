import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NewInstanceComponent} from '../admin/dialog/new-instance-component';
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
  public isAdmin: boolean;

  constructor(private scannerInstanceDS: ScannerInstanceDataService,
              private router: Router) {
    this.isLoaderShown = true;

    this.isAdmin = Boolean(localStorage.getItem('isAdmin'));
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

  public showReport(instance: any): void {
    this.isLoaderShown = true;
    this.router.navigate(['/scanner/report', instance.pid]).then(() => {
      this.toggleSidebar();
      this.isLoaderShown = false;
    });
  }

  public openInstances(): void {
    this.router.navigate(['/scanner/admin']).then(() => {
      this.toggleSidebar();
    });
  }

  public logout(): Promise<any> {
    localStorage.clear();
    return this.router.navigate(['login']);
  }
}
