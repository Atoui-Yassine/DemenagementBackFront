import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDemenagementComponent } from './list-demenagement/list-demenagement.component';

const routes: Routes = [
  {
    path: '',
    component: ListDemenagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChauffeurRoutingModule { }
