import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthGuard} from './services/guards/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'scanner', pathMatch: 'full'
  }, {
    path: 'scanner',
    canActivate: [AuthGuard],
    loadChildren: '../app/modules/scanner/scanner.module#ScannerModule'
  }, {
    path: 'login',
    loadChildren: '../app/modules/auth/auth.module#AuthModule'
  }, {
    path: '**', redirectTo: 'scanner'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
