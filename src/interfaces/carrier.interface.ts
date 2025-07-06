import { IConductor } from "./conductor.interface";
import { IDestinatario } from "./destinatario.interface";
import { ICarrierItem } from "./item.interface";
import { IRemitente } from "./remitente.interface";
import { IVehiculo } from "./vehiculo.interface";

export interface ICarrier {
    id?: string;
    remitente: IRemitente;
    destinatario: IDestinatario;
    conductor: IConductor;
    vehiculo: IVehiculo;
    usuario: string;    
    tipo_comprobante: string;
    serie?: string;
    correlativo?: number;
    numeracion?: string;
    fecha_emision?: string;
    fecha_traslado?: string;
    fecha_actual?: string;
    llegada_direccion: string;
    llegada_ubigeo: string;
    partida_direccion: string;
    partida_ubigeo: string;    
    peso_bruto: number;
    ruc: string;
    enviado?: boolean; 
    items?: ICarrierItem[]; 
}