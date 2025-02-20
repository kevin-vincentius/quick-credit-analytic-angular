import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../core/services/guard.service';
import { FormQucaComponent } from './form-quca/form-quca/form-quca.component';
import { FormPerubahanBobotScoreComponent } from './form-perubahan-score/form-perubahan-bobot-score/form-perubahan-bobot-score.component';
import { ListFormQucaComponent } from './form-quca/list-form-quca/list-form-quca.component';
import { ListFormPerubahanBobotScoreComponent } from './form-perubahan-score/list-form-perubahan-bobot-score/list-form-perubahan-bobot-score.component';

const routes: Routes = [
  { path: '', redirectTo: 'form-quca', pathMatch: 'full' },
  {
    path: 'form-quca',
    canActivate: [GuardService],
    children: [
      { path: '', component: ListFormQucaComponent },
      { path: 'add', component: FormQucaComponent },
      { path: ':mid', component: FormQucaComponent },
    ],
  },
  {
    path: 'setting-bobot-score',
    canActivate: [GuardService],
    children: [
      { path: '', component: ListFormPerubahanBobotScoreComponent },
      { path: 'add', component: FormPerubahanBobotScoreComponent },
      { path: ':id', component: FormPerubahanBobotScoreComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
