import {Component, OnInit} from '@angular/core';
import {ReportDataService} from '../../../services/data-services/report-data.service';
import {ActivatedRoute} from '@angular/router';
import {IDetailedReport} from '../../../models/interfaces/detailed-report.interface';
import Swiper from 'swiper';

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.component.html',
  styleUrls: ['./detailed-report.component.scss']
})
export class DetailedReportComponent implements OnInit {

  private _currentReportId: string;
  public detailedReport: IDetailedReport;
  public isLoaderShown: boolean;
  public swiper: any;
  public swiperConfigs = {
    slidesPerView: 1,
    watchOverflow: true,
    grabCursor: true,
    centeredSlides: false,
    initialSlide: 0
  };

  constructor(private _reportDS: ReportDataService,
              private _route: ActivatedRoute) {
    this.isLoaderShown = true;
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this._currentReportId = params.id;
    });

    this._reportDS.getReportById(this._currentReportId).subscribe(resp => {
      this.detailedReport = resp;
      setTimeout(() => {
        this.swiper = new Swiper('.info__op', {...this.swiperConfigs,
          pagination: {
            dynamicBullets: true,
            el: '.swiper-pagination__op'
          }});
      }, 0);
      setTimeout(() => {
        this.swiper = new Swiper('.info__soft', {...this.swiperConfigs,
          slidesPerView: 2,
          initialSlide: 1,
          spaceBetween: 5,
          pagination: {
            dynamicBullets: true,
            el: '.swiper-pagination__soft'
          }});
      }, 0);
      setTimeout(() => {
        this.swiper = new Swiper('.info__bios', {...this.swiperConfigs,
          pagination: {
            dynamicBullets: true,
            el: '.swiper-pagination__bios'
          }});
      }, 0);
      setTimeout(() => {
        this.swiper = new Swiper('.info__baseboard', {...this.swiperConfigs,
          pagination: {
            dynamicBullets: true,
            el: '.swiper-pagination__baseboard'
          }});
      }, 0);
      setTimeout(() => {
        this.isLoaderShown = false;
      }, 1000);
    });
  }

}
