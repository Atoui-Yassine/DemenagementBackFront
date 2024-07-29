import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbidenComponent } from './forbiden/forbiden.component';

const routes: Routes = [
  {
    path:"403",
    component:ForbidenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
