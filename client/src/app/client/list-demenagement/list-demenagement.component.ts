import { Component, OnInit } from '@angular/core';
import { MovingReservation } from 'src/app/models/demenagement';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-demenagement',
  templateUrl: './list-demenagement.component.html',
  styleUrls: ['./list-demenagement.component.css']
})
export class ListDemenagementComponent implements OnInit {
  demenagements: MovingReservation[] = [];

  constructor(
    private clientService:ClientService,
  ) { }

  ngOnInit(): void { 
this.fetchAllDemangementByClient()
  }
  fetchAllDemangementByClient(){
    return this.clientService.fetchAllDemenagement().subscribe(
      (data:MovingReservation[])=>{
        this.demenagements=data;
        console.log('All Demenagement By client :',data);
      },(error)=>{
        console.log('Error feching All Demenagement By client :',error)
      }
    )
  }
  update(id: number): void {
    console.log('Update déménagement with id:', id);
  }

  cancel(id: number): void {
   this.clientService.changeReservationStatus(id,'CANCELED').subscribe(
    (data:MovingReservation)=>{
      console.log("Canceled Demenagement :",data)
      this.fetchAllDemangementByClient()
    },(error)=>{
      console.log('change staus error :',error)
    }
   )
  }

}
