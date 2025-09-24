export interface IRemitente{
    id?: string;
    direccion: string;
    tipo_documento: string;
    numero_documento: string;
    razon_social: string;
    nombre_comercial: string;
    token_mifact: string;
    ubigeo: string;
    correo: string;
    telefono?: string;
}