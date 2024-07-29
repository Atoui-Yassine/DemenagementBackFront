import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY = 'auth-token';
const ROLES_KEY ='roles'
@Injectable({
  providedIn: 'root'
})
export class TokenStoregService {

  constructor(private router:Router) { }

  
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  async navigetURL(roles: string[]): Promise<void> {
    let route: string;
  
    switch (true) {
      case roles.includes('ROLE_ADMIN'):
        route = '/admin';
        console.log('navigate admin');
        break;
      case roles.includes('ROLE_USER'):
        route = '/client';
        console.log('ROLE_USER navigate');
        break;
      case roles.includes('ROLE_CHAUFFEUR'):
        route = '/chauffeur';
        break;
      default:
        console.error('Invalid user role.');
        return; 
    }
  
    if (route) {
      this.router.navigate([route]);
    }
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(TOKEN_KEY);
  }
  saveRoles(roles:string[]){
    window.sessionStorage.removeItem(ROLES_KEY);
    window.sessionStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  }
  public getRoles(): string[] {
    const roles = window.sessionStorage.getItem(ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
  }
}
