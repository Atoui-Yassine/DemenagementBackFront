import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenStoregService } from './token-storage.service';
import { MovingReservation } from '../models/demenagement';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
  private apiUrl = environment.apiurl;
  constructor(private http: HttpClient, private tokenService: TokenStoregService) { }
  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  fetchAllDemenagementsByChauffeur(): Observable<MovingReservation[]> {
    const headers = this.getHeaders();
    return this.http.get<MovingReservation[]>(`${this.apiUrl}/chauffeur/demenagements`, { headers });
  }

  changeReservationStatus(reservationId: number, status: string): Observable<MovingReservation> {
    const headers = this.getHeaders();
    return this.http.put<MovingReservation>(`${this.apiUrl}/chauffeur/demenagement/${reservationId}/${status}`, { headers }).pipe(
      catchError((error: any) => {
        console.error('change status error :', error);
        throw error;
      })
    );
  }

}
