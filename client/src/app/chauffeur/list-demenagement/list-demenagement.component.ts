import { Component, OnInit } from '@angular/core';
import { MovingReservation } from 'src/app/models/demenagement';
import { ChauffeurService } from 'src/app/services/chauffeur.service';

@Component({
  selector: 'app-list-demenagement',
  templateUrl: './list-demenagement.component.html',
  styleUrls: ['./list-demenagement.component.css']
})
export class ListDemenagementComponent implements OnInit {
  reservations: MovingReservation[] = [];
  constructor(private chauffeurService: ChauffeurService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }
fetchReservations(): void {
    this.chauffeurService.fetchAllDemenagementsByChauffeur().subscribe(
      (data: MovingReservation[]) => {
        this.reservations = data;
        console.log("Get All Demenagement By Chauffeur")
      },
      (error) => {
        console.error('Error fetching Demenagement:', error);
      }
    );
  }


  changeStatus(id: number,status:string): void {
    this.chauffeurService.changeReservationStatus(id, status).subscribe(
      (data) => {
        this.fetchReservations();
        console.log("update suscaufl ",data);
      },
      (error) => {
        console.error('Error updated demenagement:', error);
      }
    );
  }

 

}
