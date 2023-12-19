export interface R_usuarios {
    nombre: string | null;
    usuarios:I_usuario[];
    id_rol?:number;
}
export interface I_usuario {
    roles: any;
    id_usuario?: number;
    nombre: String;
    correo: String;
    password: String;
    id_rol: number;
    latitud: number;
    longitud: number;
    token: String;
    estatus: number;
    created_at: String;
    updated_at: String;
}
// InsertUsuario
export interface I_agregarUsuarios{
    nombre: String;
    id_rol: number;
    correo: String;
    password: String;
}
// UpdateUsuario
export interface I_editarUsuarios{
    correo: String;
    password: String;
    id_rol: number;
    nombre: String;
    latitud: number;
    longitud: number;
}
// UpdatePassword
export interface UsuarioUpdatePassword{
    password: String;
}
export interface UsuarioDelete {
    estatus: number;
}
