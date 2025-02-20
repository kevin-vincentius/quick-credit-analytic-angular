import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isSidebarCollapsed: boolean = false; // Track the sidebar state

  currentRoute: string = ''; // Holds the active route
  menuItems = [
    // { name: 'Home', route: '/home', icon: 'bi-house-door' },
    // { name: 'My Bookings', route: '/my-bookings', icon: 'bi-bookmark' },
    // { name: 'Profile', route: '/profile', icon: 'bi-person' },
    // { name: 'ListBookings', route: '/list-bookings', icon: 'bi-list' },
    // { name: 'User Management', route: '/user-management', icon: 'bi-person-lines-fill' },
    { name: 'Form QUCA', route: '/form-quca', icon: 'bi-journal-text' },
    { name: 'Setting Bobot Score', route: '/setting-bobot-score', icon: 'bi-gear' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Update `currentRoute` whenever the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // Function to return icon based on route
  // getIcon(route: string): string {
  //   switch (route) {
  //     case '/form-quca':
  //       return 'form-quca';
  //     case '/setting-bobot-score':
  //       return 'setting-bobot-score';
  //     default:
  //       return 'home'; // Default icon
  //   }
  // }
}
