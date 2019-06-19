import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IReportResponse } from '../../models/interfaces/report.interface';
import { Mapper } from '../mappers/mapper';
import { IDetailedReport } from '../../models/interfaces/detailed-report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportApiService {

  private readonly _api: string;

  constructor(private _httpClient: HttpClient) {
    this._api = environment.scannerApi;
  }

  public findReports(pid: string, page: number = 0): Observable<IReportResponse> {
    return this._httpClient.post<any[]>(`${this._api}reports?page=${page}`, {pid: pid})
      .pipe(
        take(1),
        map((reports: any) => Mapper.mapReportResponseToIReportResponse(reports))
      );
  }

  public getReportById(reportId: string): Observable<IDetailedReport> {
    return this._httpClient.get<any>(`${this._api}reports/${reportId}`)
      .pipe(
        take(1),
        map(resp => Mapper.mapDetailedReportToIDetailedReport(resp))
      );
  }
}
