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
  filteredListForm: IFormQUCA[] = [];
  filterStatus: string = '';
  isLoading: boolean = false;
  searchQuery: string = '';
  levelAkses: string = '';

  constructor(
    private qucaService: QUCAService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.loadSession();
    this.fetchData();
    this.levelAkses = this.authService.levelAkses;
    this.filteredListForm = this.listForm;
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
        this.filteredListForm = [...this.listForm]; // Update filtered list
        console.log(this.listForm);
        this.isLoading = false;
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

  applyFilter(): void {
    this.filteredListForm = this.listForm.filter((form) => {
      // Pastikan nilai ada sebelum mengakses toLowerCase()
      const mid = form.mid ? String(form.mid) : ''; // Ensure `mid` is a string
      const namaKonsumen = form.mid?.namaKonsumen
        ? String(form.mid.namaKonsumen).toLowerCase()
        : '';
      const marketingOfficer = form.mid?.idMarketingOfficer?.namaLengkap
        ? String(form.mid.idMarketingOfficer.namaLengkap).toLowerCase()
        : '';

      // Filter berdasarkan status
      const matchesStatus =
        !this.filterStatus || form.statusQUCA === this.filterStatus;

      // Filter berdasarkan input pencarian
      const matchesSearch =
        !this.searchQuery ||
        mid.includes(this.searchQuery.toLowerCase()) ||
        namaKonsumen.includes(this.searchQuery.toLowerCase()) ||
        marketingOfficer.includes(this.searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }
}
