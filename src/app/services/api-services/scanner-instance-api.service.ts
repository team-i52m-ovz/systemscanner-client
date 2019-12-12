import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {INewInstance, INewInstancePatch, IUser} from '../../models/interfaces/new-instanse.interface';
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
        take(1)
      );
  }

  public addNewScannerInstance(newInstance: INewInstancePatch): Observable<INewInstance> {
    return this._httpClient.post<INewInstance>(`${this._api}admin/scanner-instances`, newInstance)
      .pipe(
        take(1)
      );
  }

  public getInstances(): Observable<INewInstance[]> {

    return this._httpClient.get<INewInstance[]>(`${this._api}admin/scanner-instances`)
      .pipe(take(1));
  }

  public getDetailedInstance(instancePid: {pid: string}): Observable<INewInstance> {
    return this._httpClient.post<any>(`${this._api}admin/scanner-instances/details`, instancePid)
      .pipe(
        take(1),
        map(resp => Mapper.mapNewInstanceToINewInstance(resp))
      );
  }

  public getUsers(): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(`${this._api}admin/users`)
      .pipe(take(1));
  }

  public editNewInstance(instance: INewInstancePatch): Observable<any> {
    return this._httpClient.patch(`${this._api}admin/scanner-instances`, instance)
      .pipe(take(1));
  }
}
