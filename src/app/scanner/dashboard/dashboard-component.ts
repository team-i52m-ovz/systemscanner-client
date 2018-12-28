import { Component } from '@angular/core';
import { ScannerInstanceDataService } from '../../services/scanner-instance-data-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard-component.html',
  styleUrls: ['dashboard-component.scss'],
})
export class DashboardComponent {
  instances: string[];

  constructor(private dataService: ScannerInstanceDataService, private router: Router) {
    this.dataService.findScannerInstances()
      .subscribe(res => this.instances = res);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
