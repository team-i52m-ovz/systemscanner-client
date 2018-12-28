import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ScannerInstance } from '../models/entities/scanner-instance';
import { Report } from '../models/entities/report';

@Injectable()
export class ReportDataService {
  private readonly api: string;

  constructor(private httpClient: HttpClient) {
    this.api = environment.scannerApi;
  }

  findReports(pid: string): Observable<Report[]> {
    return this.httpClient.post<Report[]>(`${this.api}reports`, {pid: pid})
      .pipe(
        map(reports => reports.map(r => new Report(r.id, new Date(r.created).toLocaleString())))
      );
  }
}
