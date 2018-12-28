import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ScannerInstance } from '../models/entities/scanner-instance';

@Injectable()
export class ScannerInstanceDataService {
  private api: string;

  constructor(private httpClient: HttpClient) {
    this.api = environment.scannerApi;
  }

  findScannerInstances(): Observable<string[]> {
    return this.httpClient.get<ScannerInstance[]>(`${this.api}scanner/instances`)
      .pipe(
        map(res => res.map(value => value.pid))
      );
  }
}
