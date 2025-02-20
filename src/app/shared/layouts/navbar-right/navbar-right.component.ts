import { Component, HostListener } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-right',
  templateUrl: './navbar-right.component.html',
  styleUrls: ['./navbar-right.component.css']
})

export class NavbarRightComponent {
  namaLengkap: string = '';
  showLogout: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router){}

  ngOnInit(): void { 
    this.namaLengkap = this.authService.namaLengkap;
  }

  toggleLogout(): void {
    this.showLogout = !this.showLogout;    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.dropdown');
    if (!clickedInside) {
      this.showLogout = false; // Close dropdown if click is outside
    }
  }
}
