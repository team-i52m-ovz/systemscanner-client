import { NgModule } from '@angular/core';
import { AuthDataService } from '../services/auth-data-service';
import { SignUpComponent } from './sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../_shared/shared.module';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers: [AuthDataService]
})
export class AuthModule {
}
