import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class GuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | UrlTree {
  //   if (this.authService.isLoggedIn()) {
  //     const levelAkses = this.authService.levelAkses; // Assuming you have this function to get user data

  //     // Allow access if the user is BM or if the user is CMO and accessing 'form-quca'
  //     if (this.isRoleAllowed(route, levelAkses)) {
  //       return true;
  //     } else {
  //       // Redirect to unauthorized page if the user doesn't have access
  //       this.router.navigate(['/unauthorized']);
  //       return false;
  //     }
  //   } else {
  //     // Redirect to login if the user is not logged in
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }
  // private isRoleAllowed(route: ActivatedRouteSnapshot, levelAkses: string): boolean {
  //   if (levelAkses === 'BM' || levelAkses === 'RM' || levelAkses === 'DD') {
  //     // BM can access all routes
  //     return true;
  //   }

  //   if (levelAkses === 'CMO' && route.routeConfig?.path === 'form-quca') {
  //     // CMO can only access 'form-quca'
  //     return true;
  //   }

  //   // For any other route or if the user is not authorized, deny access
  //   return false;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
