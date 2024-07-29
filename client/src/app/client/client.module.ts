import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ListDemenagementComponent } from './list-demenagement/list-demenagement.component';
import { AddDemenagementComponent } from './add-demenagement/add-demenagement.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListDemenagementComponent,
    AddDemenagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
