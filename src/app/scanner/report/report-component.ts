import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportDataService } from '../../services/report-data-service';
import { Report } from '../../models/entities/report';

@Component({
  selector: 'app-report',
  templateUrl: 'report-component.html',
  styleUrls: ['report-component.scss'],
})
export class ReportComponent {

  public columns = ['id', 'created'];
  public reports: Report[];

  constructor(private router: Router, protected dataService: ReportDataService, protected route: ActivatedRoute) {
    this.dataService.findReports(route.snapshot.paramMap.get('pid'))
      .subscribe(res => this.reports = res);
  }

}
