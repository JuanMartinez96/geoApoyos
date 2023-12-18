import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { R_estados,R_municipios,R_verificarConexion,R_serviciosExtra_Coordenadar,I_serviciosExtra_Coordenadar} from '../interfaces/extras';

@Injectable({providedIn: 'root',})



export class S_extras {
    // public URL = ConfiguracionesComponent.apiUrl;
    public URL = "https://prototipo2023-d6240700184c.herokuapp.com/";
    constructor(private http: HttpClient) { }

    
    getEstados(): Observable<R_estados>{
        return this.http.get<R_estados>(`${this.URL}api/services`);
    }
    getMunicipios(estado:string):Observable<R_municipios>{
        return this.http.get<R_municipios>(`${this.URL}api/services/${estado}`);
    }


    getVerificaConexion(): Observable<R_verificarConexion>{
        return this.http.get<R_verificarConexion>(`${this.URL}api/services/verificarConexion`);
    }
    getCoordenadar(direccion:I_serviciosExtra_Coordenadar):Observable<R_serviciosExtra_Coordenadar>{
        return this.http.post<R_serviciosExtra_Coordenadar>(`${this.URL}api/services/0`,direccion);
    }



    
  
}