import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {INewInstanse} from '../../models/interfaces/new-instanse.interface';
import {Mapper} from '../mappers/mapper';

@Injectable({
  providedIn: 'root'
})
export class ScannerInstanceApiService {
  private readonly _api: string;

  constructor(private _httpClient: HttpClient) {
    this._api = environment.scannerApi;
  }

  public findScannerInstances(): Observable<string[]> {
    return this._httpClient.get<any[]>(`${this._api}scanner-instances`)
      .pipe(
        take(1),
        map(res => res.map(value => value && value.pid))
      );
  }

  public addNewScannerInstance(newInstance: INewInstanse): Observable<INewInstanse> {
    return this._httpClient.post<any>(`${this._api}scanner-instances`, newInstance)
      .pipe(
        take(1),
        map(resp => Mapper.mapNewInstanceToINewInstance(resp))
      );
  }
}
