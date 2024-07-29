import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Vehicle } from 'src/app/models/Vehicle';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-camion',
  templateUrl: './list-camion.component.html',
  styleUrls: ['./list-camion.component.css']
})
export class ListCamionComponent implements OnInit {
  expandedIndex: number | null = null;
  vehicles: Vehicle[] = [];

  constructor(private adminService:AdminService,private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
   this.fetchVehicles();
  }
  fetchVehicles(): void {
    this.adminService.getAllVehicles().subscribe(
      (data: Vehicle[]) => {
        this.vehicles = data;
        console.log('All vehicles :', data)
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }
  deleteCamionBId(camionId :number){
    this.adminService.deleteCamion(camionId).subscribe(
      ()=>{
        console.log("Camion deleted with id :",camionId)
        this.fetchVehicles()
      },(error)=>{
        console.log("Error deleted camion : ",error)
      }
    )
  }

  toggleAccordion(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

}
