import { Component } from '@angular/core';
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
  zipcode: number | null = null;
  pendapatan: number | null = null;
  tabungan: number | null = null;
  angsuran: number | null = null;
  tabThdAngs: number | null = null;
  angsThdPdpt: number | null = null;
  statusPekerjaan: number | null = null;
  statusTempatTinggal: number | null = null;
  kondisiTempatTinggal: number | null = null;
  karakterDiLingkungan: number | null = null;
  hasilGetContact: number | null = null;
  hasilSLIK: number | null = null;
  currentForm!: IFormQUCA;
  isMidFromUrl: boolean = false; // Flag to track if MID is from the URL
  levelAkses: string = ''; // Add a property for storing user level

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private qucaService: QUCAService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.loadSession();

     // Get user level from session or user service
     const levelAkses = this.authService.levelAkses; // Assuming you have a method to get the logged-in user
     if (levelAkses) {
       this.levelAkses = levelAkses; // Assign the user level here
     }     

     console.log(levelAkses);
     
    // Ambil MID dari URL
    this.route.paramMap.subscribe((paramMap) => {
      const midFromUrl = paramMap.get('mid');

      if (midFromUrl) {
        this.mid = Number(midFromUrl);
        this.isMidFromUrl = true;
        this.getFormDetail(this.mid);
      } else {
        this.isMidFromUrl = false;
      }
    });
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
        this.updateCategories(); // Tambahkan ini
      },
      error: (error) => {
        console.error('get data mid error: ', error);
      },
    });
  }

  updateCategories(): void {
    // Memicu ulang perhitungan kategori setelah data di-load
    this.tabThdAngsCategory;
    this.angsThdPdptCategory;
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
      },
      error: (err: any) => {
        console.error('Error fetching form detail:', err);
      },
    });
  }

  submitFormQUCA(): void {
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
        if(response.status === 201){
          this.router.navigate(['/form-quca']);
        }
      },
      error: (err) => {
        console.error('error: ', err);
      },
    });
  }

  approveForm(): void {
    // Logic to approve the form
    console.log('Form approved');
  }

  rejectForm(): void {
    // Logic to reject the form
    console.log('Form rejected');
  }
}
