import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/UserLogin';
import { catchError, Observable } from 'rxjs';
import { JwtResponse } from '../models/JwtResponse';
import { UserRegister } from '../models/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl=environment.apiurl;
  constructor(private http: HttpClient) { }
  
  signIn( userLogin:UserLogin):Observable<JwtResponse>{
    return this.http.post<JwtResponse>(`${this.apiUrl}/auth/signin`,userLogin).pipe(
      catchError((error :any) =>{
        console.error('Login error :',error);
        throw error;
      })
    )
    
  }
  signUp( userRegister:UserRegister):Observable<string>{
    return this.http.post<string>(`${this.apiUrl}/auth/signup`,userRegister).pipe(
      catchError((error:any)=>{
        console.log('Register Error :',error)
        throw error;
      })
    )
  }

}
