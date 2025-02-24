import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isSidebarCollapsed: boolean = false; // Track the sidebar state
  currentRoute: string = ''; // Holds the active route
  menuItems = [
    { name: 'Form QUCA', route: '/form-quca', icon: 'bi-journal-text' },
    {
      name: 'Setting Bobot Score',
      route: '/setting-bobot-score',
      icon: 'bi-gear',
    },
  ];

  filteredMenuItems: any = []; // To store the filtered menu items based on the user's role

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Update `currentRoute` whenever the route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });

    const currentRole = this.authService.levelAkses;
    if (currentRole === 'CMO') {
      // CMO can only see 'Form QUCA'
      this.filteredMenuItems = this.menuItems.filter(
        (item) => item.route === '/form-quca'
      );
    } else if (currentRole === 'BM' || currentRole === 'RM' || currentRole === 'DD') {
      // BM can see all menu items
      this.filteredMenuItems = this.menuItems;
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
