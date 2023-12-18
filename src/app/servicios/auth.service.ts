import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { I_login, R_login } from '../interfaces/auth';
import { I_mensaje } from '../interfaces/mensaje';

@Injectable({providedIn: 'root',})



export class S_auth {
    // public URL = ConfiguracionesComponent.apiUrl;
    public URL = "https://prototipo2023-d6240700184c.herokuapp.com/";
    constructor(private http: HttpClient) { }


    login(datos:I_login): Observable<R_login>{
        return this.http.post<R_login>(`${this.URL}api/auth/login`,datos);
    }
    logout(id:number):Observable<I_mensaje>{
        return this.http.post<I_mensaje>(`${this.URL}api/auth/logout/${id}`,{});
    }


   
}
