import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../interfaces/here_maps';

declare const H: any;

@Injectable({providedIn: 'root',})


export class S_heremaps {
    // public URL = ConfiguracionesComponent.apiUrl;
    public URL = "https://prototipo2023-d6240700184c.herokuapp.com/";
    private platform: any;
    constructor(private http: HttpClient) {
        this.platform = new H.service.Platform({apikey: environment.hereMaps.apiKey});
    }


    initializeMap(mapElement: HTMLElement): void {
        const defaultLayers = this.platform.createDefaultLayers();
        const map = new H.Map(mapElement, defaultLayers.vector.normal.map, {
            center: { lat: 0, lng: 0 }, // Centro del mapa inicial
            zoom: 2, // Nivel de zoom inicial
            });
    }
    // getApoyos(): Observable<R_apoyos>{
    //     return this.http.get<R_apoyos>(`${this.URL}api/apoyo`);
    // }
    // getApoyosStatus():Observable<R_ApoyosStatus>{
    //     return this.http.get<R_ApoyosStatus>(`${this.URL}api/apoyo/estatus/`);
    // }
  
}