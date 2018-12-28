import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', redirectTo: 'scanner', pathMatch: 'full'
  }, {
    path: 'scanner',
    canActivate: [AuthGuard],
    loadChildren: '../app/scanner/scanner-module#ScannerModule'
  }, {
    path: 'login',
    loadChildren: '../app/auth/auth-module#AuthModule'
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
