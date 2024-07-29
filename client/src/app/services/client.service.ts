import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStoregService } from './token-storage.service';
import { catchError, Observable } from 'rxjs';
import { MovingReservation } from '../models/demenagement';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.apiurl;
  constructor(private http: HttpClient, private tokenService: TokenStoregService) { }
  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  addDemenagement(demenagement:MovingReservation):Observable<MovingReservation>{
    const headers = this.getHeaders();
    return this.http.post<MovingReservation>(`${this.apiUrl}/client/demenagement`, demenagement, { headers }).pipe(
      catchError((error: any) => {
        console.error('Add Demenagement error :', error);
        throw error;
      })
    );
  }
  fetchAllDemenagement():Observable<MovingReservation[]>{
    const headers = this.getHeaders();
    return this.http.get<MovingReservation[]>(`${this.apiUrl}/client/demenagements`, { headers }).pipe(
      catchError((error: any) => {
        console.error('ALL  Demenagement error :', error);
        throw error;
      })
    );
  }
  changeReservationStatus(reservationId: number, status: string): Observable<MovingReservation> {
    const headers = this.getHeaders();
    return this.http.put<MovingReservation>(`${this.apiUrl}/client/demenagement/${reservationId}/${status}`,  { headers }).pipe(
      catchError((error: any) => {
        console.error('change status error :', error);
        throw error;
      })
    );
  }
}
