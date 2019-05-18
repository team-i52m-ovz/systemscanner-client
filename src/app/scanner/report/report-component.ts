import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ReportDataService } from '../../services/report-data-service';
import { Report } from '../../models/entities/report';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: 'report-component.html',
  styleUrls: ['report-component.scss'],
})
export class ReportComponent {

  public columns = ['id', 'created'];
  public reports: Report[];

  constructor(private router: Router, protected dataService: ReportDataService, protected route: ActivatedRoute) {
    route.url.subscribe(() => {
      this.dataService.findReports(this.route.snapshot.paramMap.get('pid'))
        .subscribe(res => this.reports = res);
    });
  }

}
