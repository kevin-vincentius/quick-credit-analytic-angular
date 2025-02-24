import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CurrencyPipe } from './currency.pipe';

const MODULES = {
  IMPORTANT: [AuthModule, ContentModule],
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    CoreModule,
    ...MODULES.IMPORTANT,
    SharedModule,
  ],
  providers: [BsModalService, CurrencyPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}