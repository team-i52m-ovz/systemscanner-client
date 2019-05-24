import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ScannerInstanceApiService} from '../api-services/scanner-instance-api.service';
import {INewInstanse} from '../../models/interfaces/new-instanse.interface';

@Injectable()
export class ScannerInstanceDataService {

  constructor(private _scannerInstanceApi: ScannerInstanceApiService) {
  }

  public findScannerInstances(): Observable<string[]> {
    return this._scannerInstanceApi.findScannerInstances();
  }

  public addNewScannerInstance(newInstance: INewInstanse): Observable<INewInstanse> {
    return this._scannerInstanceApi.addNewScannerInstance(newInstance);
  }
}
