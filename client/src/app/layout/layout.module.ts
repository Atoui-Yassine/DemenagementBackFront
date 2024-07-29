import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ErrorLayoutComponent } from './error-layout/error-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ChauffeurLayoutComponent } from './chauffeur-layout/chauffeur-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    ErrorLayoutComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    ChauffeurLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule, 
    MatToolbarModule,
    SharedModule,

  ]
})
export class LayoutModule { }
