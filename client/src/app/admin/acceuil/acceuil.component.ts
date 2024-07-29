import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  tot_camion:number =0;
  tot_driver :number =0;
  tot_client :number =0;
  tot_element :number =0;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.getCountCamion();
    this.getCountChauffeur();
    this.getCountClient();
    this.getCountDemenagement();
  }

  getCountChauffeur(){
    this.adminService.CountChaufeur().subscribe(
      (res:number)=>{
        this.tot_driver=res;
        console.log("numbre  chauffeur: ",res)
      },(error)=>{
        console.log('Error fetch Count Chauffeur :',error)
      }
    )
  }
  getCountClient(){
    this.adminService.CountClient().subscribe(
      (res:number)=>{
        this.tot_client=res;
        console.log("numbre  client: ",res)
      },(error)=>{
        console.log('Error fetch Count client :',error)
      }
    )
  }
  getCountCamion(){
    this.adminService.CountCamion().subscribe(
      (res:number)=>{
        this.tot_camion=res;
        console.log("numbre  camion: ",res)
      },(error)=>{
        console.log('Error fetch Count camion :',error)
      }
    )
  }
  getCountDemenagement(){
    this.adminService.CountDemenagement().subscribe(
      (res:number)=>{
        this.tot_element=res;
        console.log("numbre  demenagement: ",res)
      },(error)=>{
        console.log('Error fetch Count demenagement :',error)
      }
    )
  }

}
