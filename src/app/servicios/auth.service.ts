import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { I_login, R_login } from '../interfaces/auth';
import { I_mensaje } from '../interfaces/mensaje';
import { R_permisos, R_roles } from '../interfaces/roles_permisos';
import { R_usuarios } from '../interfaces/usuarios';

@Injectable({providedIn: 'root',})



export class S_auth {

  private localStorageKey = 'loggedInUser';

    public URL = "https://prototipo2023-d6240700184c.herokuapp.com/";
    constructor(private http: HttpClient) { }


    login(datos: I_login): Observable<R_login> {
      return this.http.post<R_login>(`${this.URL}api/auth/login`, datos).pipe(
        map((response) => {
          localStorage.setItem(this.localStorageKey, JSON.stringify(response.usuario));
          return response;
        })
      );
    }

    getLoggedInUser(): R_usuarios {
    const userString = localStorage.getItem(this.localStorageKey);
    return userString ? JSON.parse(userString) : null;
  }


    logout(id:number):Observable<I_mensaje>{
        return this.http.post<I_mensaje>(`${this.URL}api/auth/logout/${id}`,{});
    }

    getRoles(roleId: number): Observable<string> {
      return this.http.get<string>(`${this.URL}api/roles/${roleId}/nombre`);
    }

    getPermisos(index_permiso:number):Observable<R_permisos>{
      return this.http.get<R_permisos>(`${this.URL}api/permisos/${index_permiso}`);
  }

}


