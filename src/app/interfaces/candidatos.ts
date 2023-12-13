export interface R_Candidatos {
    cantidatos:cantidato[];
}

export interface cantidato {
    id_candidato: number;
    nombre: string;
    edad: number;
    calle: string;
    colonia: string;

    municipio: string;
    estado: string;
    entre_calles: string;
    no_int: string;
    no_ext: string;

    institucion: string;
    grado_escolaridad: string;
    id_tipo_apoyo: number;
    id_estatus_apoyo: number;
    fotografia: string;

    created_at: string;
    updated_at: string;

    latitud: number;
    longitud: number;

//    ----------------------------------------------------------------
    pregunta1: number;
    pregunta2:string; //": "none",
    pregunta3:string; //": "none",
    pregunta4:string; //": "none",
    pregunta5:string; //": "none",
    pregunta6:string; //": "none",
    pregunta7:string; //": "none",
    pregunta8:string; //": "none",
    pregunta9:string; //": "none",
    pregunta10:Pregunta10;
}


export interface R_CandidatoVisita{
    result:I_visita[];
}

export interface I_visita{
    id_visita: number;
    id_candidato: number;
    id_usuario: number;
    razon:string; //": "comosea",
    id_estatus_encuesta: number;
    fotografia:string; //": "www.google.com.mx",
    latitud:string; //": "2.200000",
    longitud:string; //": "-2.200000",
    created_at:string; //": "2023-11-24T10:21:30.242Z",
    updated_at:string; //": "2023-11-26T18:36:13.387Z",
    nombre:string; //": "charly modificado",
    edad: number;
    estado:string; //": "Guanajuato",
    municipio:string; //": "Salamanca",
    colonia:string; //": "Jardines del Moral",
    calle:string; //": "Jardin del final",
    entre_calles:string; //": "paseo y el otro",
    no_int:string; //": "217",
    no_ext:string; //": "D",
    institucion:string; //": "Guadalupe Pedroza",
    grado_escolaridad:string; //": "Secundaria",
    id_tipo_apoyo: number;
    id_estatus: number;

    pregunta1: number;
    pregunta2:string; //": "none",
    pregunta3:string; //": "none",
    pregunta4:string; //": "none",
    pregunta5:string; //": "none",
    pregunta6:string; //": "none",
    pregunta7:string; //": "none",
    pregunta8:string; //": "none",
    pregunta9:string; //": "none",
    pregunta10:Pregunta10;
    correo:string;
    password:string;
    id_rol: number;
    token:string;
    estatus: number;
}

export interface Pregunta10{
    // ESTOS DEBERIAN SER BOOLEANOS :c
    a1:string;
    a2:string;
    a3:string;
    a4:string;

    a5:string;
    a6:string;
    a7:string;
    a8:string;
}

// INSERTAR CANDIDATO
export interface I_agregarCandidato{

    nombre:string;
    edad:number;
    estado:string;
    municipio:string;
    colonia:string;
    calle:string;
    entre_calles:string;
    no_int:number;
    no_ext:string;
    institucion:string;
    grado_escolaridad:string;
    fotografia:string;
    id_tipo_apoyo:number;
    id_estatus:number;
    latitud:number;
    longitud:number;

//  PREGUNTAS ----------------------------------------------------------------
    pregunta1: number;
    pregunta2:string; //": "none",
    pregunta3:string; //": "none",
    pregunta4:string; //": "none",
    pregunta5:string; //": "none",
    pregunta6:string; //": "none",
    pregunta7:string; //": "none",
    pregunta8:string; //": "none",
    pregunta9:string; //": "none",
    pregunta10:Pregunta10;
}


export interface I_agregarVisita{
    id_usuario: number;
    razon: string;
    id_estatus_encuesta: number;
    fotografia: string;
    latitud: number;
    longitud: number;
}





export interface UpdateStatus{
    id_status_apoyo:number;
}