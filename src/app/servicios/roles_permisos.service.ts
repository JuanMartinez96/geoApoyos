import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { R_permisos, R_roles} from '../interfaces/roles_permisos';

@Injectable({providedIn: 'root',})



export class S_roles_permisos {
    // public URL = ConfiguracionesComponent.apiUrl;
    public URL = "https://prototipo2023-d6240700184c.herokuapp.com/";
    constructor(private http: HttpClient) { }

    
    getRoler(): Observable<R_roles>{
        return this.http.get<R_roles>(`${this.URL}api/roles`);
    }
    getPermisos(index_permiso:number):Observable<R_permisos>{
        return this.http.get<R_permisos>(`${this.URL}api/permisos/${index_permiso}`);
    }
  
}