import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ScannerInstanceApiService} from '../api-services/scanner-instance-api.service';
import {INewInstance, INewInstancePatch, IUser} from '../../models/interfaces/new-instanse.interface';

@Injectable()
export class ScannerInstanceDataService {

  private _adminInstances: BehaviorSubject<INewInstance[]> = new BehaviorSubject<INewInstance[]>([]);
  public adminInstances$: Observable<INewInstance[]> = this._adminInstances.asObservable();

  constructor(private _scannerInstanceApi: ScannerInstanceApiService) {
  }

  public setAdminInstances(instances: INewInstance[]): void {
    this._adminInstances.next(instances);
  }

  public getAdminInstances(): INewInstance[] {
    return this._adminInstances.getValue();
  }


  public findScannerInstances(): Observable<string[]> {
    return this._scannerInstanceApi.findScannerInstances();
  }

  public addNewScannerInstance(newInstance: INewInstancePatch): Observable<INewInstance> {
    return this._scannerInstanceApi.addNewScannerInstance(newInstance);
  }

  public getInstances(): Observable<INewInstance[]> {
    return this._scannerInstanceApi.getInstances();
  }

  public getDetailedInstance(instancePid: {pid: string}): Observable<INewInstance> {
    return this._scannerInstanceApi.getDetailedInstance(instancePid);
  }

  public getUsers(): Observable<IUser[]> {
    return this._scannerInstanceApi.getUsers();
  }

  public editNewInstance(instance: INewInstancePatch): Observable<any> {
    return this._scannerInstanceApi.editNewInstance(instance);
  }
}
