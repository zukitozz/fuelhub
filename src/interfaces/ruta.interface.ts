import { IDestinatario } from "./destinatario.interface";
import { IOrigen } from "./origen.interface";

export interface IRuta {
    id?: string;
    ubigeo_origen: string;
    ubigeo_destino: string;
    precio_galon: number;   
}
export interface IRutaTable {
    items: IRutaObject[];
    lastEvaluatedKey: any;
}
export interface IRutaObject {
    destino: IDestinatario;
    origen: IOrigen;
    precio: number;
    fecha_crea: string;
    estado: number
}
export interface IRutaResponse {
    result: boolean;
    message: string;
    historic: IRutaTable;
}