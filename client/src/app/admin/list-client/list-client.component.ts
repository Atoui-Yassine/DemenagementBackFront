import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  clients: Client[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllClient();
  }

  getAllClient() {
    this.adminService.getAllClient().subscribe((data: Client[]) => {
      this.clients = data;
      console.log('Get All Clients :', data);

    },
      (error) => {
        console.log('Get All Client Errors :', error)
      }
    )
  }

  deleteClient(clientId: number): void {

    this.adminService.deleteClient(clientId).subscribe(
      () => {
        console.log("Delete client succes with id :", clientId)
        this.getAllClient();
      }, (error) => {
        console.log("Delete client Error :", error)
      }
    )
  }

}
