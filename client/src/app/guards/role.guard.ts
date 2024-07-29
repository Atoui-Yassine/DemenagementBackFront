import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStoregService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenStoregService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.tokenService.isLoggedIn()) {
      this.router.navigate(['']);
      console.log('eeeeeeeeeeeeeee') 

      return false;
    }

    const expectedRoles = route.data['expectedRoles'];
    const userRoles = this.tokenService.getRoles();

    const hasRole = expectedRoles.some((role: string) => userRoles.includes(role));

    if (!hasRole) {
      this.router.navigate(['403']); 
    }

    return true;
  }
  
}
