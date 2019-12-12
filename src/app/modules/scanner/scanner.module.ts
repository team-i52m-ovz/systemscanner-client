import {NgModule} from '@angular/core';
import {ScannerRoutingModule} from './scanner-routing.module';
import {DashboardComponent} from './dashboard/dashboard-component';
import {MatCardModule, MatDialogModule, MatListModule, MatRadioModule, MatSelectModule, MatTableModule} from '@angular/material';
import {NewInstanceComponent} from './admin/dialog/new-instance-component';
import {ReportComponent} from './report/report-component';
import {SharedModule} from '../../_shared/shared.module';
import {ScannerInstanceDataService} from '../../services/data-services/scanner-instance-data.service';
import {ReportDataService} from '../../services/data-services/report-data.service';
import {ScannerInstanceApiService} from '../../services/api-services/scanner-instance-api.service';
import {ReportApiService} from '../../services/api-services/report-api.service';
import {DetailedReportComponent} from './detailed-report/detailed-report.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    NewInstanceComponent,
    DashboardComponent,
    ReportComponent,
    DetailedReportComponent,
    AdminComponent
  ],
  entryComponents: [
    NewInstanceComponent
  ],
  imports: [
    ScannerRoutingModule,
    MatRadioModule,
    MatListModule,
    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [
    ScannerInstanceDataService,
    ScannerInstanceApiService,
    ReportDataService,
    ReportApiService
  ]
})
export class ScannerModule {
}
