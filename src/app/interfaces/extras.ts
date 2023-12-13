export interface R_estados {
    estados:String[];
}
export interface R_municipios {
    municipios:String[];
}

export interface R_verificarConexion {
    connected:boolean;
    message:String;
}
export interface R_serviciosExtra_Coordenadar {
    latitud:number;
    longitud:number;
}
export interface I_serviciosExtra_Coordenadar {
    direccion:String;
}
