import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chauffeur } from 'src/app/models/Chauffeur';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-detail-chauffeur',
  templateUrl: './detail-chauffeur.component.html',
  styleUrls: ['./detail-chauffeur.component.css']
})
export class DetailChauffeurComponent implements OnInit {

  driver!: Chauffeur;

  constructor(
    private route : ActivatedRoute,
    private adminService :AdminService
  ) { }

   ngOnInit() :void {
    const param_id = this.route.snapshot.paramMap.get("id");
    if(param_id !== null){
      const driver_id = +param_id;
      this.getChauffeurByID(driver_id);
      console.log("ces le drive id" + driver_id);
    }
    
   }

 getChauffeurByID(id :number){
  return this.adminService.getChauffeurById(id).subscribe(
    (data: Chauffeur) => {
      this.driver = data;
      console.log(' chauffeur :',data)
    },
    (error) => {
      console.error('Error fetching chauffeur:', error);
    }
  );
 }
 
}
