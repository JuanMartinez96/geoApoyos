import { I_usuario } from "./usuarios";

// ENVIO
export interface I_login {
    correo:String;
    password:String;
}
//RESPUESTA
export interface R_login {
    usuario:I_usuario;
    token:String;
}