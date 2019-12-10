import { Component, OnInit } from '@angular/core';
import {NewInstanceComponent} from './dialog/new-instance-component';
import {INewInstance, INewInstancePatch, IUser} from '../../../models/interfaces/new-instanse.interface';
import {MatDialog} from '@angular/material';
import {ScannerInstanceDataService} from '../../../services/data-services/scanner-instance-data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public isLoaderShown: boolean;
  public instancesList$: Observable<INewInstance[]>;
  public columns = ['pid', 'name'];
  public users: IUser[];

  constructor(private scannerInstanceDS: ScannerInstanceDataService,
              public dialog: MatDialog) {
    this.instancesList$ = this.scannerInstanceDS.adminInstances$;
  }

  ngOnInit() {
    this.scannerInstanceDS.getInstances().subscribe(resp => {
      this.scannerInstanceDS.setAdminInstances(resp);
    });

    this.scannerInstanceDS.getUsers().subscribe(resp => {
      this.users = resp;
    });
  }

  public openDialog(isEdit: boolean, element?: INewInstance): void {
      this.isLoaderShown = false;
      const dialogRef = this.dialog.open(NewInstanceComponent, {
        data: {
          usersList: this.users,
          instance: element,
          isEdit: isEdit
        }});

      dialogRef.afterClosed().subscribe(result => {
        if (result && result.instance) {
          result.isEdit ?
            this.editNewInstance(result.instance) :
            this.addNewInstance(result.instance);
        }
      });
  }

  public addNewInstance(newInstance: INewInstance): void {
    this.isLoaderShown = true;
    const newInstancePatch: INewInstancePatch = {
      ...JSON.parse(JSON.stringify(newInstance)),
      users: JSON.parse(JSON.stringify(newInstance)).users.map(el => el.id)
    };

    this.scannerInstanceDS.addNewScannerInstance(newInstancePatch)
      .subscribe(() => {
        this.scannerInstanceDS.setAdminInstances(
          this.scannerInstanceDS.getAdminInstances().length ?
            this.scannerInstanceDS.getAdminInstances().concat(newInstance) :
            [newInstance]
        );
        this.isLoaderShown = false;
    });
  }

  public editNewInstance(newInstance: INewInstance): void {
    this.isLoaderShown = true;
    const newInstancePatch: INewInstancePatch = {
      ...JSON.parse(JSON.stringify(newInstance)),
      users: JSON.parse(JSON.stringify(newInstance)).users.map(el => el.id)
    };
    this.scannerInstanceDS.editNewInstance(newInstancePatch)
      .subscribe((resp: INewInstance) => {
        const newInstances: INewInstance[] = this.scannerInstanceDS.getAdminInstances();

        const newInstanceIndex: number = newInstances.indexOf(resp);
        newInstances.splice(newInstanceIndex, 1, newInstance);

        this.scannerInstanceDS.setAdminInstances(newInstances);
        this.isLoaderShown = false;
      });
  }

  public editInstance(instance: INewInstance): void {
    this.isLoaderShown = true;
    this.scannerInstanceDS.getDetailedInstance({pid: instance.pid})
      .subscribe((resp: INewInstance) => {
        this.openDialog(true, resp);
      });
  }


}
