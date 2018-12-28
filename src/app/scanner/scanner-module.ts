import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ScannerRoutingModule } from './scanner-routing.module';
import { DashboardComponent } from './dashboard/dashboard-component';
import { HomeComponent } from './home/home-component';
import { ScannerInstanceDataService } from '../services/scanner-instance-data-service';
import { MatListModule, MatRadioModule } from '@angular/material';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    ScannerRoutingModule,
    MatRadioModule,
    MatListModule,
    SharedModule
  ],
  providers: [ScannerInstanceDataService]
})
export class ScannerModule {
}
