import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStoregService } from 'src/app/services/token-storage.service';
interface Notification {
  message: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  @Input() notifications: Notification[] = [];
  @Input() profileLink: string = '';

  isProfileMenuOpen = false;
  isNotificationsMenuOpen = false;
  isLoggedIn !:boolean; 

  constructor(private router:Router,private tokenStoreg:TokenStoregService){}
  ngOnInit(): void {
    this.isLoggedIn=this.tokenStoreg.isLoggedIn()
  }
  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
    this.isNotificationsMenuOpen = false;
  }

  toggleNotificationsMenu() {
    this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen;
    this.isProfileMenuOpen = false;
  }
  login(){
    this.router.navigate(['/auth/login']);
  }
  

  logout() {
    this.tokenStoreg.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
  // modifet avec les role de user connect
  naviget(){
   const roles= this.tokenStoreg.getRoles();
   this.tokenStoreg.navigetURL(roles);
    
  }
}
