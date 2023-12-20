import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { I_mensaje } from '../interfaces/mensaje';

@Injectable({providedIn: 'root',})



export class soporte {
    public URL = "https://prototipo2023-d6240700184c.herokuapp.com/";
    constructor(private http: HttpClient) { }


    CorreoRecuperacion(correo:String): Observable<I_mensaje>{
        return this.http.post<I_mensaje>(`${this.URL}api/soporte/correo/${correo}`,{});
    }
    ContraseniaRecuperacion(correo:String):Observable<I_mensaje>{
        return this.http.get<I_mensaje>(`${this.URL}api/soporte/contrasenia/${correo}`);
    }

    // @POST("api/soporte/correo/{correo}") Call<C_mensaje> CorreoRecuperacion(@Path("correo") String correo);
    // @POST("api/soporte/contrasenia/{pass}") Call<C_mensaje> ContraseniaRecuperacion(@Path("pass") String pass);
}
