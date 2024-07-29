import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/Vehicle';
import { catchError, Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { TokenStoregService } from './token-storage.service';
import { Chauffeur } from '../models/Chauffeur';
import { AssigneDemande } from '../models/AssigneDemande';
import { Client } from '../models/Client';
import { MovingReservation } from '../models/demenagement';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiurl;
  constructor(private http: HttpClient, private tokenService: TokenStoregService) { }
  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const headers = this.getHeaders();
    return this.http.post<Vehicle>(`${this.apiUrl}/admin/vehicle`, vehicle, { headers }).pipe(
      catchError((error: any) => {
        console.error('Create Vehicle error :', error);
        throw error;
      })
    );
  }
  getAllVehicles(): Observable<Vehicle[]> {
    const headers = this.getHeaders();
    return this.http.get<Vehicle[]>(`${this.apiUrl}/admin/camion`, { headers }).pipe(
      catchError((error: any) => {
        console.error('All Vehicles error :', error);
        throw error;
      })
    );
  }


  addChauffeur(chauffeur: Chauffeur): Observable<Chauffeur[]> {
    const headers = this.getHeaders();
    return this.http.post<Chauffeur[]>(`${this.apiUrl}/admin/chauffeurs`, chauffeur,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Add Chauffeur error :', error);
        throw error;
      })
    );
  }

  getAllChauffeurs(): Observable<Chauffeur[]> {
    const headers = this.getHeaders();
    return this.http.get<Chauffeur[]>(`${this.apiUrl}/admin/chauffeurs`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('All Chauffeur error :', error);
        throw error;
      })
    );
  }

  assignDemend(assigneDemande: AssigneDemande): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/admin/assign`, assigneDemande,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Assigne Demenagement error :', error);
        throw error;
      })
    );
  }
  getChauffeurById(id: number): Observable<Chauffeur> {
    const headers = this.getHeaders();
    return this.http.get<Chauffeur>(`${this.apiUrl}/admin/chauffeur/${id}`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Get chauffeur by id error :', error);
        throw error;
      })
    );
  }

  getAllClient(): Observable<Client[]>{
    const headers = this.getHeaders();
    return this.http.get<Client[]>(`${this.apiUrl}/admin/clients`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Get All Clients error :', error);
        throw error;
      })
    );
  }


  fetchAllDemenagements(): Observable<MovingReservation[]> {
    const headers = this.getHeaders();
    return this.http.get<MovingReservation[]>(`${this.apiUrl}/admin/demenagements`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Get All Demenagement error :', error);
        throw error;
      })
    );
  }
  getAllCamion():Observable<Vehicle[]>{
    const headers = this.getHeaders();
    return this.http.get<Vehicle[]>(`${this.apiUrl}/admin/camion`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Get All camion error :', error);
        throw error;
      })
    );
  }
  deleteChauffeur(chauffeurId : number):Observable<void>{
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/admin/${chauffeurId}`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Delete Chauffeur error :', error);
        throw error;
      })
    );
  }
  deleteCamion(camionId:number):Observable<void>{
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/admin/camion/${camionId}`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Delete Camion error :', error);
        throw error;
      })
    );
  }
  deleteClient(clientId :number):Observable<void>{
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/admin/client/${clientId}`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Delete Client error :', error);
        throw error;
      })
    );
  }
  deleteDemenagement(demID :number):Observable<void>{
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/admin/demenagement/${demID}`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Delete Demenagement error :', error);
        throw error;
      })
    );
  }

  CountChaufeur():Observable<number>{
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.apiUrl}/admin/chaufeur/count`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Count chauffeur error :', error);
        throw error;
      })
    );
  }
  CountClient():Observable<number>{
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.apiUrl}/admin/client/count`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Count client error :', error);
        throw error;
      })
    );
  }
  CountCamion():Observable<number>{
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.apiUrl}/admin/camion/count`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Count camion error :', error);
        throw error;
      })
    );
  }
  CountDemenagement():Observable<number>{
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.apiUrl}/admin/demenagement/count`,{ headers }).pipe(
      catchError((error: any) => {
        console.error('Count demenagement error :', error);
        throw error;
      })
    );
  }
}
