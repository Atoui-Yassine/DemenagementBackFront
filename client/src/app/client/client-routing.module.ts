import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDemenagementComponent } from './list-demenagement/list-demenagement.component';
import { AddDemenagementComponent } from './add-demenagement/add-demenagement.component';

const routes: Routes = [
  {
    path: '',
    component: ListDemenagementComponent,
  },
  {
    path: 'add-demenagement',
    component: AddDemenagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
