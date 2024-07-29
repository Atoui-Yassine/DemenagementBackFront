import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCamionComponent } from './add-camion/add-camion.component';
import { ListCamionComponent } from './list-camion/list-camion.component';
import { AddChauffeurComponent } from './add-chauffeur/add-chauffeur.component';
import { ListChauffeurComponent } from './list-chauffeur/list-chauffeur.component';
import { ListClientComponent } from './list-client/list-client.component';
import { ListDemenagementComponent } from './list-demenagement/list-demenagement.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DetailChauffeurComponent } from './detail-chauffeur/detail-chauffeur.component';
import { AssignerChauffeurComponent } from './assigner-chauffeur/assigner-chauffeur.component';

const routes: Routes = [
 {
  path:'',children: [
    {
      path:"",
      component:AcceuilComponent
    },
    {
      path:"add-camion",
      component:AddCamionComponent
    },
    {
      path:"list-camion",
      component:ListCamionComponent
    },
    {
      path:"add-chauffeur",
      component:AddChauffeurComponent
    },
    {
      path:"list-chauffeur",
      component:ListChauffeurComponent
    },
    {
      path: 'chauffeur-detail/:id',
      component: DetailChauffeurComponent,
    },
    {
      path:"list-client",
      component:ListClientComponent
    },
    {
      path:"list-demenagement",
      component:ListDemenagementComponent
    },
    {
      path: 'assigner-chauffeur/:id',
      component: AssignerChauffeurComponent,
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
