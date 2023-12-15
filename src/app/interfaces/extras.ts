export interface R_estados {
    estados:string[];
}
export interface R_municipios {
    municipios:string[];
}

export interface R_verificarConexion {
    connected:boolean;
    message:string;
}
export interface R_serviciosExtra_Coordenadar {
    latitud:number;
    longitud:number;
}
export interface I_serviciosExtra_Coordenadar {
    direccion:string;
}
