import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportComponent } from './report/report-component';
import { DashboardComponent } from './dashboard/dashboard-component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: 'report', component: ReportComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScannerRoutingModule {
}
