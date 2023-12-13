import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { I_login, R_login } from '../interfaces/auth';
import { I_mensaje } from '../interfaces/mensaje';

@Injectable({providedIn: 'root',})



export class auth {
    // public URL = ConfiguracionesComponent.apiUrl;
    public URL = "ConfiguracionesComponent.apiUrl";
    constructor(private http: HttpClient) { }

    
    login(datos:I_login): Observable<R_login>{
        return this.http.post<R_login>(`${this.URL}api/auth/login`,datos);
    }
    logout(id:number):Observable<I_mensaje>{
        return this.http.post<I_mensaje>(`${this.URL}api/auth/logout/${id}`,{});
    }
  
  
    // Operación GET
    // getData(): Observable<any> {
    //   return this.http.get<any>(this.apiUrl);
    // }
  
    // // Operación POST
    // postData(data: any): Observable<any> {
    //   return this.http.post<any>(this.apiUrl, data);
    // }
  
    // // Operación PUT
    // putData(id: number, data: any): Observable<any> {
    //   const url = `${this.apiUrl}/${id}`;
    //   return this.http.put<any>(url, data);
    // }
  
    // // Operación DELETE
    // deleteData(id: number): Observable<any> {
    //   const url = `${this.apiUrl}/${id}`;
    //   return this.http.delete<any>(url);
    // }
}