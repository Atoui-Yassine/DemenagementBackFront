import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chauffeur } from 'src/app/models/Chauffeur';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-chauffeur',
  templateUrl: './list-chauffeur.component.html',
  styleUrls: ['./list-chauffeur.component.css']
})
export class ListChauffeurComponent implements OnInit {

  drivers: Chauffeur[]=[];

  constructor(private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(url?: string): void {
  this.adminService.getAllChauffeurs().subscribe((data:Chauffeur[])=>{
    this.drivers=data
    console.log('All chauffeurs',data)
  },
(error)=>{
  console.log("Error get All Chauffeurs : ",error)
})
  }

  add(): void {
    this.router.navigate(['/admin/add-chauffeur']);
  }

  update(id: number): void {
    this.router.navigate(['/admin/update-chauffeur', id]);
  }

  detail(id: number): void {
    this.router.navigate(['/admin/chauffeur-detail', id]);
  }

  delete(id: number): void {
   this.adminService.deleteChauffeur(id).subscribe(
    ()=>{
      console.log("Delete Chauffeur succes with id :",id)
      this.loadDrivers()
    },(error)=>{
      console.log("Delete chauffeur Error :", error)
    }
   )
  }

 

}
