import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ReportApiService} from '../api-services/report-api.service';
import {IReport, IReportResponse} from '../../models/interfaces/report.interface';
import {IDetailedReport} from '../../models/interfaces/detailed-report.interface';

@Injectable()
export class ReportDataService {

  private _reportsList: BehaviorSubject<IReport[]> = new BehaviorSubject([]);
  public readonly reportsList$: Observable<IReport[]> = this._reportsList.asObservable();

  private _paginationData: BehaviorSubject<{ isLast: boolean, pageNumber: number }> =
    new BehaviorSubject({isLast: true, pageNumber: 0});
  public readonly paginationData$: Observable<{ isLast: boolean, pageNumber: number }> = this._paginationData.asObservable();

  constructor(private _reportApi: ReportApiService) {
  }

  public getNameByPid(pid: string): Observable<any> {
    return this._reportApi.getNameByPid(pid);
  }

  public get reportsList(): IReport[] {
    return this._reportsList.getValue();
  }

  public get paginationData(): { isLast: boolean, pageNumber: number } {
    return this._paginationData.getValue();
  }

  public setReportsList(reports: IReport[]): void {
    this._reportsList.next(reports);
  }

  public setPaginationData(paginationData: { isLast: boolean, pageNumber: number }): void {
    this._paginationData.next(paginationData);
  }

  public findReports(pid: string, page: number): Observable<IReportResponse> {
    return this._reportApi.findReports(pid, page);
  }

  public getReportById(reportId: string): Observable<IDetailedReport> {
    return this._reportApi.getReportById(reportId);
  }
}
