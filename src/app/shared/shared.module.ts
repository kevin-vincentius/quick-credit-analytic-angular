import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MessageValidationComponent } from './components/message-validation/message-validation.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarRightComponent } from './layouts/navbar-right/navbar-right.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    MessageValidationComponent,
    SidebarComponent,
    NavbarRightComponent,
    UnauthorizedComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [provideHttpClient()],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MessageValidationComponent,
    SidebarComponent,
    NavbarRightComponent,
  ],
})
export class SharedModule {}
