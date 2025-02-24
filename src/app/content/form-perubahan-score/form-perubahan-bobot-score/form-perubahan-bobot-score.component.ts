import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreService } from '../../../core/services/score.service';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { IFormPerubahan } from '../../../core/interfaces/i-form-perubahan';
import { ICabang } from '../../../core/interfaces/i-cabang';
import { IScore } from '../../../core/interfaces/i-score';

@Component({
  selector: 'app-form-perubahan-bobot-score',
  templateUrl: './form-perubahan-bobot-score.component.html',
  styleUrl: './form-perubahan-bobot-score.component.css',
})
export class FormPerubahanBobotScoreComponent {
  newBobotTabThdAngs: any = null;
  newBobotAngsThdPdpt: number = 0;
  newBobotStatusPekerjaan: number = 0;
  newBobotStatusTempatTinggal: number = 0;
  newBobotKondisiTempatTinggal: number = 0;
  newBobotKarakter: number = 0;
  newBobotHasilGetContact: number = 0;
  newBobotHasilSLIK: number = 0;
  listCabang: ICabang[] = [];
  selectedCabang: ICabang | null = null;
  scoreCabang: any = {
    idScore: 0,
    idCabang: {} as ICabang,
    bobotAngsThdPdpt: 0,
    bobotHasilGetContact: 0,
    bobotHasilSLIK: 0,
    bobotKarakter: 0,
    bobotKondisiTempatTinggal: 0,
    bobotStatusPekerjaan: 0,
    bobotStatusTempatTinggal: 0,
    bobotTabThdAngs: 0,
  };
  idFormPerubahan: number = 0;
  namaCabang?: string;
  levelAkses: string = '';
  statusFormPerubahan: string = '';
  showRejectModal: boolean = false; // To control the reject modal visibility
  showApproveModal: boolean = false; // To control the approve modal visibility
  totalScore: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scoreService: ScoreService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.loadSession();
    this.levelAkses = this.authService.levelAkses;
    this.getListCabang();

    this.idFormPerubahan = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idFormPerubahan) {
      this.getDetailFormPerubahan(this.idFormPerubahan);
    }
    this.calculateTotalScore();
    console.log(this.totalScore);
  }

  // Open Reject Modal
  openRejectModal(): void {
    this.showRejectModal = true;
    console.log('open modal');
  }

  // Close Modal
  closeModal(): void {
    this.showRejectModal = false;
    this.showApproveModal = false;
    console.log('close modal');
  }

  // Close modal and navigate to setting-bobot-score
  closeModalAndNavigate(): void {
    this.closeModal();
    this.router.navigate(['/setting-bobot-score']);
  }

  calculateTotalScore(): void {
    this.totalScore =
      (Number(this.newBobotTabThdAngs) || 0) +
      (Number(this.newBobotAngsThdPdpt) || 0) +
      (Number(this.newBobotStatusPekerjaan) || 0) +
      (Number(this.newBobotStatusTempatTinggal) || 0) +
      (Number(this.newBobotKondisiTempatTinggal) || 0) +
      (Number(this.newBobotKarakter) || 0) +
      (Number(this.newBobotHasilGetContact) || 0) +
      (Number(this.newBobotHasilSLIK) || 0);
  }

  getProgressColor(): string {
    if (this.totalScore === 100) {
      return 'bg-success';
    } else if (this.totalScore !== 100) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }

  getScoreCabang(idCabang?: number): void {
    if (!idCabang) {
      console.warn('Cabang belum dipilih');
      return;
    }

    this.scoreService.getScoreCabang(idCabang).subscribe({
      next: (resp) => {
        this.calculateTotalScore();
        const scoreCabang = resp.data;
        this.newBobotAngsThdPdpt = scoreCabang.bobotAngsThdPdpt;
        this.newBobotHasilGetContact = scoreCabang.bobotHasilGetContact;
        this.newBobotHasilSLIK = scoreCabang.bobotHasilSLIK;
        this.newBobotKarakter = scoreCabang.bobotKarakter;
        this.newBobotKondisiTempatTinggal =
          scoreCabang.bobotKondisiTempatTinggal;
        this.newBobotStatusPekerjaan = scoreCabang.bobotStatusPekerjaan;
        this.newBobotStatusTempatTinggal = scoreCabang.bobotStatusTempatTinggal;
        this.newBobotTabThdAngs = scoreCabang.bobotTabThdAngs;
        this.calculateTotalScore();

        console.log(scoreCabang);
      },
      error: (error) => {
        console.error('get score cabang error: ', error);
      },
    });
  }

  getListCabang(): void {
    this.scoreService.getListCabang().subscribe({
      next: (resp) => {
        this.listCabang = resp.data;
        console.log(resp);
      },
      error: (error) => {
        console.error('get list cabang error: ', error);
      },
    });
  }

  getDetailFormPerubahan(idFormPerubahan: number): void {
    this.scoreService.getDetailFormPerubahan(idFormPerubahan).subscribe({
      next: (resp) => {
        
        const form = resp.data;
        this.namaCabang = form.idCabang.namaCabang;
        this.newBobotTabThdAngs = form.newBobotTabThdAngs;
        this.newBobotAngsThdPdpt = form.newBobotAngsThdPdpt;
        this.newBobotStatusPekerjaan = form.newBobotStatusPekerjaan;
        this.newBobotStatusTempatTinggal = form.newBobotStatusTempatTinggal;
        this.newBobotKondisiTempatTinggal = form.newBobotKondisiTempatTinggal;
        this.newBobotKarakter = form.newBobotKarakter;
        this.newBobotHasilGetContact = form.newBobotHasilGetContact;
        this.newBobotHasilSLIK = form.newBobotHasilSLIK;
        this.statusFormPerubahan = form.statusFormPerubahan;
        this.calculateTotalScore();
        console.log(resp);
      },
      error: (error) => {
        console.error('get detail form error: ', error);
      },
    });
  }

  submitForm(): void {
    console.log(this.selectedCabang);

    const reqFormPerubahan: IFormPerubahan = {
      idCabang: this.selectedCabang?.idCabang || 0, // Use idCabang if selectedCabang exists
      newbobotTabThdAngs: this.newBobotTabThdAngs,
      newBobotAngsThdPdpt: this.newBobotAngsThdPdpt,
      newBobotStatusPekerjaan: this.newBobotStatusPekerjaan,
      newBobotStatusTempatTinggal: this.newBobotStatusTempatTinggal,
      newBobotKondisiTempatTinggal: this.newBobotKondisiTempatTinggal,
      newBobotKarakter: this.newBobotKarakter,
      newBobotHasilGetContact: this.newBobotHasilGetContact,
      newBobotHasilSLIK: this.newBobotHasilSLIK,
    };
    this.scoreService.submitFormPerubahan(reqFormPerubahan).subscribe({
      next: (response) => {
        console.log('sukses submit form: ', response);
        if (response.status === 201) {
          this.router.navigate(['/setting-bobot-score']);
        }
      },
      error: (err) => {
        console.error('error: ', err);
        if (err.status === 409) {
          console.error('Ada form pengajuan pending untuk cabang ini');
          return;
        }
      },
    });
  }

  approveForm(): void {
    this.scoreService.approveFormPerubahan(this.idFormPerubahan).subscribe({
      next: (response) => {
        console.log('sukses submit form: ', response);
        if (response.status === 200) {
          this.showApproveModal = true; // Show success approval modal
        }
      },
      error: (err) => {
        console.error('error: ', err);
        if (err.status === 409) {
          console.error('Ada form pengajuan pending untuk cabang ini');
          return;
        }
      },
    });
  }

  rejectForm(): void {
    this.scoreService.rejectFormPerubahan(this.idFormPerubahan).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.showRejectModal = false;
          this.router.navigate(['/setting-bobot-score']);
        }
      },
      error: (err) => {
        console.error('Rejection failed:', err);
        this.showRejectModal = false;
      },
    });
  }
}
