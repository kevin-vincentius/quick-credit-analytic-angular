import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ScoreService } from '../../../core/services/score.service';
import { IFormPerubahan } from '../../../core/interfaces/i-form-perubahan';

@Component({
  selector: 'app-list-perubahan-bobot-score',
  templateUrl: './list-form-perubahan-bobot-score.component.html',
  styleUrl: './/list-form-perubahan-bobot-score.component.css',
})
export class ListFormPerubahanBobotScoreComponent {
  listForm: IFormPerubahan[] = [];
  filteredListForm: IFormPerubahan[] = [];
  filterStatus: string = ''; // Menyimpan status yang dipilih
  searchQuery: string = '';
  levelAkses: string = '';
  isLoading: boolean = false;

  constructor(
    private scoreService: ScoreService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.loadSession();
    this.fetchData();
    this.levelAkses = this.authService.levelAkses;
    this.filteredListForm = this.listForm; // Pastikan list awalnya terisi
  }

  fetchData(): void {
    this.scoreService.getListForm().subscribe({
      next: (resp) => {
        this.listForm = resp.data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('get list form error: ', error);
      },
    });
  }

  applyFilter(): void {
    this.filteredListForm = this.listForm.filter((form) => {
      // Pastikan nilai ada sebelum mengakses toLowerCase()
      const idCabang = form.idCabang?.idCabang ? String(form.idCabang.idCabang).toLowerCase() : '';
      const namaCabang = form.idCabang?.namaCabang ? String(form.idCabang.namaCabang).toLowerCase() : '';
      const namaPengaju = form.createdBy?.namaLengkap ? String(form.createdBy.namaLengkap).toLowerCase() : '';
      
  
      // Filter berdasarkan status
      const matchesStatus =
        !this.filterStatus || form.statusFormPerubahan === this.filterStatus;
  
      // Filter berdasarkan input pencarian
      const matchesSearch =
        !this.searchQuery ||
        idCabang.includes(this.searchQuery.toLowerCase()) ||
        namaCabang.includes(this.searchQuery.toLowerCase()) ||
        namaPengaju.includes(this.searchQuery.toLowerCase());
  
      return matchesStatus && matchesSearch;
    });
  }
  
}
