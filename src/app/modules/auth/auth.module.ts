import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import {SharedModule} from '../../_shared/shared.module';
import {AuthDataService} from '../../services/data-services/auth-data.service';
import {AuthApiService} from '../../services/api-services/auth-api.service';


@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    AuthDataService,
    AuthApiService
  ]
})
export class AuthModule {
}
