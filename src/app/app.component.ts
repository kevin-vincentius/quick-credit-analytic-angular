import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  navbarHeight: number = 50; // Default value, adjust if navbar height changes dynamically

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
    // If navbar height changes dynamically, calculate it here
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      this.navbarHeight = navbar.clientHeight;
    }
  }
}
