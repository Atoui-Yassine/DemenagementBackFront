import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssigneDemande } from 'src/app/models/AssigneDemande';
import { Chauffeur } from 'src/app/models/Chauffeur';
import { Vehicle } from 'src/app/models/Vehicle';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-assigner-chauffeur',
  templateUrl: './assigner-chauffeur.component.html',
  styleUrls: ['./assigner-chauffeur.component.css']
})
export class AssignerChauffeurComponent implements OnInit {
  drivers: Chauffeur[] = [];
  camions:Vehicle[]=[];
  reservationId!: number;
  assignForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    this.assignForm = this.formBuilder.group({
      driverId: ['', Validators.required],
      camionId:['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param !== null) {
      this.reservationId = +param;
    }

    this.adminService.getAllChauffeurs().subscribe(
      (data: Chauffeur[]) => {
        this.drivers = data;
      },
      (error) => {
        console.error('Error fetching chauffeurs:', error);
      }
    );
    this.AllCamion();
  }

  AllCamion(){
    return this.adminService.getAllCamion().subscribe(
      (data:Vehicle[])=>{
        this.camions=data
        console.log("all camion :",data)
      },(error)=>{
        console.log(" Error fetching All camion : ",error);
      }
    )
  }

  onSubmit(): void {
    if (this.assignForm.valid) {
      const assigneDemande: AssigneDemande = {
        reservationId: this.reservationId,
        driverId: this.assignForm.value.driverId,
        camionId:this.assignForm.value.camionId,
        description: this.assignForm.value.description
      };

      this.adminService.assignDemend(assigneDemande).subscribe(
        (response) => {
          console.log('Driver assigned successfully:', response);
          
          this.router.navigate(['admin/list-demenagement']);
        },
        (error) => {
          console.error('Error assigning driver:', error);
        }
      );
    }
  }

}
