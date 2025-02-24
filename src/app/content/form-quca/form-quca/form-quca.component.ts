import { Component, Pipe } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { QUCAService } from '../../../core/services/quca.service';
import { IFormQUCA } from '../../../core/interfaces/i-form-quca';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponse } from '../../../core/interfaces/i-api-response';

@Component({
  selector: 'app-form-quca',
  templateUrl: './form-quca.component.html',
  styleUrls: ['./form-quca.component.scss'],
})
export class FormQucaComponent {
  mid!: number;
  namaCabang: string = '';
  namaShowroom: string = '';
  domisiliKonsumen: string = '';
  namaMarketingOfficer: string = '';
  namaKonsumen: string = '';
  zipcode: any = null;
  pendapatan: number = 0;
  tabungan: number = 0;
  angsuran: number = 0;
  tabThdAngs: number | null = null;
  angsThdPdpt: number | null = null;
  statusPekerjaan: number | null = null;
  statusTempatTinggal: number | null = null;
  kondisiTempatTinggal: number | null = null;
  karakterDiLingkungan: number | null = null;
  hasilGetContact: number | null = null;
  hasilSLIK: number | null = null;
  isMidFromUrl: boolean = false; // Flag to track if MID is from the URL
  levelAkses: string = ''; // Add a property for storing user level
  totalScore: number = 0;
  statusQUCA!: string;
  showRejectModal: boolean = false; // Flag to show the modal
  rejectNotes: string = ''; // Variable to store rejection notes

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qucaService: QUCAService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.loadSession();

    const levelAkses = this.authService.levelAkses; // Assuming you have a method to get the logged-in user
    if (levelAkses) {
      this.levelAkses = levelAkses; // Assign the user level here
    }

    // Ambil MID dari URL
    this.route.paramMap.subscribe((paramMap) => {
      const midFromUrl = paramMap.get('mid');

      if (midFromUrl) {
        this.mid = Number(midFromUrl);
        this.isMidFromUrl = true;
        this.getFormDetail(this.mid);
        console.log(this.statusQUCA);
      } else {
        this.isMidFromUrl = false;
      }
    });
  }

  getScoreColor(score: number): string {
    if (score <= 2) return 'text-red-500';
    if (score <= 3) return 'text-yellow-500';
    return 'text-green-500';
  }

  get fullAddress(): string {
    if (this.zipcode == null) {
      return '-';
    }
    return `${this.domisiliKonsumen} - ${this.zipcode}`;
  }

  set fullAddress(value: string) {
    const split = value.split(' ');
    this.zipcode = +split[0]; // Extracts the zipcode from the input
    this.domisiliKonsumen = split.slice(1).join(' '); // Joins the remaining part as domisiliKonsumen
  }

  get tabThdAngsCategory(): string {
    if (!this.tabungan || !this.angsuran || this.angsuran === 0) {
      return '-';
    }
    const rasio = this.tabungan / this.angsuran || 0;

    if (rasio < 1) {
      this.tabThdAngs = 1;
      return 'Kurang dari 1 kali angsuran';
    } else if (rasio >= 1 && rasio <= 3) {
      this.tabThdAngs = 2;
      return '1 - 3 kali angsuran';
    } else if (rasio > 3 && rasio <= 6) {
      this.tabThdAngs = 3;
      return '3 - 6 kali angsuran';
    } else {
      this.tabThdAngs = 4;
      return 'Di atas 6 kali angsuran';
    }
  }

  get angsThdPdptCategory(): string {
    if (!this.pendapatan || this.pendapatan === 0 || !this.angsuran) {
      return '-';
    }
    const percentage = (this.angsuran / this.pendapatan) * 100;

    if (percentage > 50) {
      this.angsThdPdpt = 1;
      return 'Di atas 50% pendapatan';
    } else if (percentage >= 30 && percentage <= 50) {
      this.angsThdPdpt = 2;
      return '30% - 50% pendapatan';
    } else if (percentage < 30 && percentage >= 10) {
      this.angsThdPdpt = 3;
      return 'Dibawah 30% pendapatan';
    } else {
      this.angsThdPdpt = 4;
      return 'Dibawah 10% pendapatan';
    }
  }

  // Show the modal when Reject button is clicked
  openRejectModal(): void {
    this.showRejectModal = true;
  }

  // Close the modal without rejecting
  closeRejectModal(): void {
    this.showRejectModal = false;
  }

  getDataMID(): void {
    this.qucaService.getDataKonsumenByMID(this.mid).subscribe({
      next: (resp) => {
        const data = resp.data;
        this.namaCabang = data.idCabang.namaCabang;
        this.namaMarketingOfficer = data.idMarketingOfficer.namaLengkap;
        this.namaShowroom = data.idShowroom.namaShowroom;
        this.domisiliKonsumen = data.domisiliKonsumen;
        this.namaKonsumen = data.namaKonsumen;
        this.zipcode = data.zipcode;
        this.pendapatan = data.pendapatan;
        this.tabungan = data.tabungan;
        this.angsuran = data.angsuran;
        console.log(resp);
        
      },
      error: (error) => {
        console.error('get data mid error: ', error);
        if(error.error.status === 409){
          alert('MID sudah dipakai di form lain!')
        }
        if(error.error.status === 400){
          alert('MID tidak ditemukan!')
        }
      },
    });
  }

  convertToNumber(value: any): number {
    return Number(value) || 0;
  }

  getFormDetail(mid: number): void {
    this.qucaService.getFormByMID(mid).subscribe({
      next: (resp: IApiResponse) => {
        const data = resp.data;
        this.namaCabang = data.mid.idCabang.namaCabang;
        this.namaMarketingOfficer = data.mid.idMarketingOfficer.namaLengkap;
        this.namaShowroom = data.mid.idShowroom.namaShowroom;
        this.domisiliKonsumen = data.mid.domisiliKonsumen;
        this.namaKonsumen = data.mid.namaKonsumen;
        this.zipcode = data.mid.zipcode;
        this.pendapatan = data.mid.pendapatan;
        this.tabungan = data.mid.tabungan;
        this.angsuran = data.mid.angsuran;
        this.statusPekerjaan = data.statusPekerjaan;
        this.statusTempatTinggal = data.statusTempatTinggal;
        this.kondisiTempatTinggal = data.kondisiTempatTinggal;
        this.karakterDiLingkungan = data.karakterDiLingkungan;
        this.hasilGetContact = data.hasilGetContact;
        this.hasilSLIK = data.hasilSLIK;
        this.totalScore = data.totalScore ? data.totalScore.toFixed(2) : null;
        this.statusQUCA = data.statusQUCA;
        this.rejectNotes = data.notes;
        console.log(this.rejectNotes)
        console.log(data.statusQUCA);
      },
      error: (err: any) => {
        console.error('Error fetching form detail:', err);
      },
    });
  }

  submitForm(): void {
    const reqFormQUCA: IFormQUCA = {
      mid: this.mid,
      tabThdAngs: this.tabThdAngs,
      angsThdPdpt: this.angsThdPdpt,
      statusPekerjaan: this.statusPekerjaan,
      statusTempatTinggal: this.statusTempatTinggal,
      kondisiTempatTinggal: this.kondisiTempatTinggal,
      karakterDiLingkungan: this.karakterDiLingkungan,
      hasilGetContact: this.hasilGetContact,
      hasilSLIK: this.hasilSLIK,
    };
    this.qucaService.submitFormQUCA(reqFormQUCA).subscribe({
      next: (response) => {
        console.log('sukses submit form: ', response);
        // this.loadBookings();
        if (response.status === 201) {
          this.router.navigate(['/form-quca']);
        }
      },
      error: (err) => {
        console.error('error: ', err);
      },
    });
  }

  updateForm(): void {
    const reqUpdateFormQUCA: IFormQUCA = {
      mid: this.mid,
      tabThdAngs: this.tabThdAngs,
      angsThdPdpt: this.angsThdPdpt,
      statusPekerjaan: this.statusPekerjaan,
      statusTempatTinggal: this.statusTempatTinggal,
      kondisiTempatTinggal: this.kondisiTempatTinggal,
      karakterDiLingkungan: this.karakterDiLingkungan,
      hasilGetContact: this.hasilGetContact,
      hasilSLIK: this.hasilSLIK,
    };

    this.qucaService.updateFormQUCA(reqUpdateFormQUCA).subscribe({
      next: (response) => {
        console.log(response);

        if (response.status === 201) {
          this.router.navigate([`form-quca`]);
        }
      },
      error: (err) => {
        console.error('error: ', err);
      },
    });
  }

  approveForm(): void {
    this.qucaService.approveFormQUCA(this.mid).subscribe({
      next: (response) => {
        console.log(response);

        if (response.status === 201) {
          setTimeout(() => {
            this.router.navigate([`form-quca/${this.mid}`]); // Reload the component
            window.scrollTo(0, 0);

          }, 3000)
        }
        this.getFormDetail(this.mid);
      },
      error: (err) => {
        console.error('error: ', err);
      },
    });
  }

  rejectForm(): void {
    this.qucaService.rejectFormQUCA(this.mid, this.rejectNotes).subscribe({
      next: (response) => {
        console.log(response);

        if (response.status === 200 || response.status === 201) {
          this.router.navigate([`form-quca`]);
          window.scrollTo(0, 0);
          this.getFormDetail(this.mid);
        }
      },
      error: (err) => {
        console.error('error: ', err);
      },
    });
    this.closeRejectModal();
  }
}
