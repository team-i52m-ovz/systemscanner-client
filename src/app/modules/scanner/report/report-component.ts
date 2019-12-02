import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {ReportDataService} from '../../../services/data-services/report-data.service';
import {IReport, IReportResponse} from '../../../models/interfaces/report.interface';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: 'report-component.html',
  styleUrls: ['report-component.scss'],
})
export class ReportComponent {

  public columns = ['id', 'created'];
  public paginationData$: Observable<{ isLast: boolean, pageNumber: number }>;
  public reportsList$: Observable<IReport[]>;
  public currentPid: string;
  public name: string;
  public isLoaderShown: boolean;

  constructor(private _router: Router,
              protected reportDS: ReportDataService,
              protected route: ActivatedRoute) {
    this.route.url.subscribe(() => {
      this.isLoaderShown = true;
      this.reportsList$ = this.reportDS.reportsList$;
      this.paginationData$ = this.reportDS.paginationData$;

      this.route.params.subscribe(params => {
        this.currentPid = params.pid;
      });

      this.reportDS.setReportsList([]);
      this.reportDS.setPaginationData({isLast: true, pageNumber: 0});

      this.getNameByPid(this.currentPid);
      this.getReports(this.currentPid);
    });
  }

  public getNameByPid(pid: string): void {
    this.reportDS.getNameByPid(pid).subscribe(resp => {
      this.name = resp.name;
    });
  }

  public getReports(pid: string): void {
    this.reportDS.findReports(pid, this.reportDS.reportsList.length ?
      ++this.reportDS.paginationData.pageNumber :
      this.reportDS.paginationData.pageNumber)
      .subscribe((res: IReportResponse) => {
        this.reportDS.setReportsList(this.reportDS.reportsList.length ? this.reportDS.reportsList.concat(res.reports) : res.reports);
        this.reportDS.setPaginationData({
          isLast: res.isLast,
          pageNumber: res.pageNumber
        });

        this.isLoaderShown = false;
      });
  }

  public navigateToDetailedReport(reportId: string): void {
    this._router.navigate(['/scanner/detailed-report', reportId]).then();
  }

}
