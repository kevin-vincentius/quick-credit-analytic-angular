import { Component } from '@angular/core';
import { IFormQUCA } from '../../../core/interfaces/i-form-quca';
import { IPagination } from '../../../core/interfaces/i-pagination';
import { QUCAService } from '../../../core/services/quca.service';
import { catchError } from 'rxjs';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { IApiResponse } from '../../../core/interfaces/i-api-response';
import { IMobileEntry } from '../../../core/interfaces/i-mobile-entry';

@Component({
  selector: 'app-list-form-quca',
  templateUrl: './list-form-quca.component.html',
  styleUrl: './list-form-quca.component.css',
})
export class ListFormQucaComponent {
  listForm: IFormQUCA[] = [];
  // form!: IFormQUCA;
  searchQuery: string = '';

  constructor(
    private qucaService: QUCAService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.loadSession();
    this.fetchData();
  }

  isIMobileEntry(mid: any): mid is IMobileEntry {
    return mid && typeof mid !== 'number';
  }

  isMidNotNumber(mid: any): boolean {
    return typeof mid !== 'number';
  }

  fetchData(): void {
    this.qucaService.getListForm().subscribe({
      next: (resp) => {
        this.listForm = resp.body?.data;
        console.log(this.listForm);
      },
      error: (error) => {
        console.error('get list form error: ', error);
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'status-approved';
      case 'NEED REVISION':
        return 'status-revision';
      case 'ON REVIEW':
        return 'status-review';
      default:
        return '';
    }
  }

  getScoreClass(score: any): string {
    if (score === '-') return '';
    return score < 2 ? 'score-low' : 'score-high';
  }
}
