import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ScannerRoutingModule } from './scanner-routing.module';
import { DashboardComponent } from './dashboard/dashboard-component';
import { ScannerInstanceDataService } from '../services/scanner-instance-data-service';
import { MatCardModule, MatDialogModule, MatListModule, MatRadioModule, MatTableModule } from '@angular/material';
import { NewInstanceComponent } from './dashboard/dialog/new-instance-component';
import { ReportComponent } from './report/report-component';
import { ReportDataService } from '../services/report-data-service';


@NgModule({
  declarations: [
    NewInstanceComponent,
    DashboardComponent,
    ReportComponent,
  ],
  entryComponents: [NewInstanceComponent],
  imports: [
    ScannerRoutingModule,
    MatRadioModule,
    MatListModule,
    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule
  ],
  providers: [ScannerInstanceDataService, ReportDataService]
})
export class ScannerModule {
}
