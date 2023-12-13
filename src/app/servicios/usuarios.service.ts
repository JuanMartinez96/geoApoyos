import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { I_agregarUsuarios, R_usuarios, I_editarUsuarios, UsuarioUpdatePassword, UsuarioDelete} from '../interfaces/usuarios';
import { I_mensaje } from '../interfaces/mensaje';

@Injectable({providedIn: 'root',})



export class usuarios {
    // public URL = ConfiguracionesComponent.apiUrl;
    public URL = "ConfiguracionesComponent.apiUrl";
    constructor(private http: HttpClient) { }

    
    GetUsuarios(): Observable<R_usuarios>{
        return this.http.get<R_usuarios>(`${this.URL}api/usuarios`);
    }

    InsertUsuario(usuario:I_agregarUsuarios): Observable<I_mensaje>{
        return this.http.post<I_mensaje>(`${this.URL}api/usuarios`,usuario);
    }

    UpdateUsuario(nuevos_datos:I_editarUsuarios, id:number): Observable<I_mensaje>{
        return this.http.put<I_mensaje>(`${this.URL}api/usuarios/${id}`,nuevos_datos);
    }

    UpdatePassword(nueva_pass:UsuarioUpdatePassword, id:number): Observable<I_mensaje>{
        return this.http.put<I_mensaje>(`${this.URL}api/cambiarPass/${id}`,nueva_pass);
    }
    
    Borrar(usuario:UsuarioDelete, id:number): Observable<I_mensaje>{
        return this.http.post<I_mensaje>(`${this.URL}api/usuarios/${id}`,usuario);
        // ESTE DEBERIA SER EL BUENO
        // return this.http.delete<I_mensaje>(`${this.URL}api/usuarios/${id}`,usuario);
    }


}