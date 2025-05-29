export interface IDestinatario {
    id?: string;
    tipo_documento: string;
    numero_documento: string;
    razon_social: string;
    ubigeo: string;
    direccion: string;
    correo: string;
    telefono?: string;    
}