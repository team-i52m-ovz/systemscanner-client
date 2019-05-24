import {Component, OnInit} from '@angular/core';
import {ReportDataService} from '../../../services/data-services/report-data.service';
import {ActivatedRoute} from '@angular/router';
import {IDetailedReport} from '../../../models/interfaces/detailed-report.interface';

declare let Swiper: any;

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.component.html',
  styleUrls: ['./detailed-report.component.scss']
})
export class DetailedReportComponent implements OnInit {

  private _currentReportId: string;
  public detailedReport: IDetailedReport;
  public swiper: any;
  public swiperConfigs = {
    slidesPerView: 1,
    watchOverflow: true,
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 0,
    mousewheel: {
      releaseOnEdges: true,
    }
  };

  constructor(private _reportDS: ReportDataService,
              private _route: ActivatedRoute) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._currentReportId = params.id;
    });

    this._reportDS.getReportById(this._currentReportId).subscribe(resp => {
      this.detailedReport = resp;
      setTimeout(() => {
        this.swiper = new Swiper('info__bios', this.swiperConfigs);
      }, 0);
      setTimeout(() => {
        this.swiper = new Swiper('info__baseboard', this.swiperConfigs);
      }, 0);
    });
  }

}
