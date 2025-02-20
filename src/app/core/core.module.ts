import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
import { BaseHttpService } from './services/base-http.service';
import { GuardService } from './services/guard.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthenticationService,
    BaseHttpService,
    GuardService,
  ],
})
export class CoreModule {}
