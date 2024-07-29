import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddChauffeurComponent } from './add-chauffeur/add-chauffeur.component';
import { ListChauffeurComponent } from './list-chauffeur/list-chauffeur.component';
import { AddCamionComponent } from './add-camion/add-camion.component';
import { ListCamionComponent } from './list-camion/list-camion.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListDemenagementComponent } from './list-demenagement/list-demenagement.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailChauffeurComponent } from './detail-chauffeur/detail-chauffeur.component';
import { AssignerChauffeurComponent } from './assigner-chauffeur/assigner-chauffeur.component';

@NgModule({
  declarations: [
    AddChauffeurComponent,
    ListChauffeurComponent,
    AddCamionComponent,
    ListCamionComponent,
    ListClientComponent,
    ListDemenagementComponent,
    AcceuilComponent,
    DetailChauffeurComponent,
    AssignerChauffeurComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    
  ]
})
export class AdminModule { }
