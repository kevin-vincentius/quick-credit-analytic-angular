import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormQucaComponent } from './form-quca/form-quca/form-quca.component';
import { FormPerubahanBobotScoreComponent } from './form-perubahan-score/form-perubahan-bobot-score/form-perubahan-bobot-score.component';
import { SharedModule } from '../shared/shared.module';
import { ListFormPerubahanBobotScoreComponent } from './form-perubahan-score/list-form-perubahan-bobot-score/list-form-perubahan-bobot-score.component';
import { ListFormQucaComponent } from './form-quca/list-form-quca/list-form-quca.component';
import { FormsModule } from '@angular/forms';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
  declarations: [
    FormQucaComponent,
    FormPerubahanBobotScoreComponent,
    ListFormPerubahanBobotScoreComponent,
    ListFormQucaComponent
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    FormsModule, 
    ContentRoutingModule
  ], 
})
export class ContentModule { }
