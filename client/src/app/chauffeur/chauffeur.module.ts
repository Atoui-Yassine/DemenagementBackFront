import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChauffeurRoutingModule } from './chauffeur-routing.module';
import { ListDemenagementComponent } from './list-demenagement/list-demenagement.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListDemenagementComponent
  ],
  imports: [
    CommonModule,
    ChauffeurRoutingModule,
    ReactiveFormsModule,
    
  ]
})
export class ChauffeurModule { }
