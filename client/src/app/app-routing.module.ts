import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ErrorLayoutComponent } from './layout/error-layout/error-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { ChauffeurLayoutComponent } from './layout/chauffeur-layout/chauffeur-layout.component';
import { RoleGuard } from './guards/role.guard';
const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
      }
    ]
  },
  {
    path: '', component: AdminLayoutComponent, children: [
      
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] }
      }
    ]
  },
  {
    path: '', component: ClientLayoutComponent, children: [
      
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_USER'] }
      }
    ]
  },
  {
    path: '', component: ChauffeurLayoutComponent, children: [
      
      {
        path: 'chauffeur',
        loadChildren: () => import('./chauffeur/chauffeur.module').then(m => m.ChauffeurModule),
        canActivate: [RoleGuard],
        data: { expectedRoles: ['ROLE_CHAUFFEUR'] }
      }
    ]
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '', component: ErrorLayoutComponent, children: [
      {path: '**', redirectTo: '403', pathMatch: 'full'},
      {
        path: '',
        loadChildren: () =>  import('./error/error.module').then(m => m.ErrorModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
