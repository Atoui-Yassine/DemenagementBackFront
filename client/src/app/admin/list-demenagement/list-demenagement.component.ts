import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovingReservation } from 'src/app/models/demenagement';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-demenagement',
  templateUrl: './list-demenagement.component.html',
  styleUrls: ['./list-demenagement.component.css']
})
export class ListDemenagementComponent implements OnInit {

  reservations: MovingReservation[] = [];

  constructor(
    private adminService: AdminService,
    private router:Router
    
  ) { }

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.adminService.fetchAllDemenagements().subscribe(
      (data: MovingReservation[]) => {
        this.reservations = data;
        console.log('Get All Demenagement : ' , data)
      },
      (error) => {
        console.error('Error fetching demeneagement :', error);
      }
    );
  }

  assignDriver(reservationId: number): void {
    this.router.navigate(['/admin/assigner-chauffeur', reservationId]);
    
  }

  deleteReservation(reservationId: number): void {
   
    this.adminService.deleteDemenagement(reservationId).subscribe(
      () => {
        console.log("Delete Demenagement succes with id :", reservationId)
        this.fetchReservations()
      }, (error) => {
        console.log("Delete Demenagement Error :", error)
      }
    )
  }

}
