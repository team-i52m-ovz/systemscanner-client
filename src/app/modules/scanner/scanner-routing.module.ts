import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ReportComponent} from './report/report-component';
import {DashboardComponent} from './dashboard/dashboard-component';
import {DetailedReportComponent} from './detailed-report/detailed-report.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: 'report/:pid', component: ReportComponent},
      {path: 'detailed-report/:id', component: DetailedReportComponent},
      {path: 'report', redirectTo: '', pathMatch: 'full'},
      {path: 'detailed-report', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScannerRoutingModule {
}
