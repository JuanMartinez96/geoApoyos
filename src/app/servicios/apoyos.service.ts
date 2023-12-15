import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { R_apoyos, R_ApoyosStatus } from '../interfaces/apoyos';

@Injectable({providedIn: 'root',})



export class S_apoyos {
    // public URL = ConfiguracionesComponent.apiUrl;
    public URL = "https://prototipo2023-d6240700184c.herokuapp.com/";
    constructor(private http: HttpClient) { }

    
    getApoyos(): Observable<R_apoyos>{
        return this.http.get<R_apoyos>(`${this.URL}api/apoyo`);
    }
    getApoyosStatus():Observable<R_ApoyosStatus>{
        return this.http.get<R_ApoyosStatus>(`${this.URL}api/apoyo/estatus/`);
    }
  
}