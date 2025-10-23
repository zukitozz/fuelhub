export interface IReceptor{
    id?: string;
    tipo_documento: string;
    numero_documento: string;
    razon_social: string;
    nombre_comercial: string;
    direccion: string;
    ubigeo: string;
    token_mifact: string;
    correo?: string;
    placa?: string;
}