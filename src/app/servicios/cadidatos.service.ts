import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';


import { I_mensaje,I_mensaje2, I_mensaje3 } from '../interfaces/mensaje';
import { R_Candidatos,R_CandidatoVisita, I_agregarCandidato ,I_agregarVisita,UpdateStatus, visitas,I_visita} from '../interfaces/candidatos';


@Injectable({providedIn: 'root',})



export class S_cadidatos{
    // public URL = ConfiguracionesComponent.apiUrl;
    public URL = "https://prototipo2023-d6240700184c.herokuapp.com/";
    constructor(private http: HttpClient) { }

    GetVisitas(): Observable<visitas>{
        return this.http.get<visitas>(`${this.URL}api/candidatos/visitas`);
    }

    GetCandidatos(): Observable<R_Candidatos>{
        return this.http.get<R_Candidatos>(`${this.URL}api/candidatos`);
    }
    GetCandidatoVisita(id:number): Observable<R_CandidatoVisita>{
        return this.http.get<R_CandidatoVisita>(`${this.URL}api/candidatos/visita/${id}`);
    }


    InsertCandidatos(candidato:I_agregarCandidato): Observable<I_mensaje3>{
        return this.http.post<I_mensaje3>(`${this.URL}api/candidatos`,candidato);
    }
    InsertVisita(usuario:I_agregarVisita, id:number): Observable<I_mensaje>{
        return this.http.post<I_mensaje>(`${this.URL}api/candidatos/visita/${id}`,usuario);
    }



    UpdateCandidatoStatus(estado:UpdateStatus,id:number): Observable<I_mensaje2>{
        return this.http.put<I_mensaje2>(`${this.URL}api/candidatos/apoyo/${id}`,estado);
    }
    UpdateCandidato(nuevos_datos:I_agregarCandidato, id:number): Observable<I_mensaje2>{
        return this.http.put<I_mensaje2>(`${this.URL}api/candidatos/${id}`,nuevos_datos);
    }



    updateImage(data: FormData, id: number, que_guardo:string): Observable<any> {
        return this.http.put<any>(`${this.URL}api/uploads/${que_guardo}/${id}`, data);
    }
    getImage(id: number): Observable<any> {
        return this.http.get<any>(`${this.URL}api/uploads/visitas/${id}`)
    }

}
