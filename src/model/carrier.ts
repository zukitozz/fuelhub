import { ICarrier, ICarrierItem, IConductor, IDestinatario, IRemitente, IVehiculo } from "../interfaces";
export class Carrier implements ICarrier{
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
    constructor(serie: string, remitente: IRemitente, destinatario: IDestinatario, conductor: IConductor, vehiculo: IVehiculo, usuario: string, tipo_comprobante: string, numeracion: string, llegada_direccion: string, llegada_ubigeo: string, partida_direccion: string, partida_ubigeo: string, peso_bruto: number, ruc: string, items: ICarrierItem[]) {
        this.remitente = remitente;
        this.destinatario = destinatario;
        this.conductor = conductor;
        this.vehiculo = vehiculo;
        this.usuario = usuario;
        this.tipo_comprobante = tipo_comprobante;
        this.serie = serie;
        this.numeracion = numeracion;
        this.llegada_direccion = llegada_direccion;
        this.llegada_ubigeo = llegada_ubigeo;
        this.partida_direccion = partida_direccion;
        this.partida_ubigeo = partida_ubigeo;
        this.peso_bruto = peso_bruto;
        this.ruc = ruc;
        this.items = items || [];
    }
}