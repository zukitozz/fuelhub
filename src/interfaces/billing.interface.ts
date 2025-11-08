import { IConductor } from "./conductor.interface";
import { IDestinatario } from "./destinatario.interface";
import { IItem } from "./item.interface";
import { IOrigen } from "./origen.interface";
import { IReceptor } from "./receptor.interface";
import { IRemitente } from "./remitente.interface";
import { IVehiculo } from "./vehiculo.interface";

export interface IBilling {
    id?: string;
    receptor: IReceptor;
    usuario: string;
    idCierreTurno?: string;     
    tipo_comprobante: string;
    serie?: string;
    correlativo?: number;
    numeracion?: string;    
    fecha_emision?: string;
    fecha_actual?: string;
    tipo_moneda?: string;
    tipo_operacion?: string;
    tipo_nota?: string;
    tipo_documento_afectado?: string;
    numeracion_documento_afectado?: string;
    motivo_documento_afectado?: string;
    fecha_documento_afectado?: string;
    total_gravadas: number;
    total_igv: number;
    total_venta: number;
    monto_letras?: string;
    cadena_para_codigo_qr?: string;
    codigo_hash?: string;
    pdf_bytes?: string;
    url?: string;
    errors?: string;
    comentario?: string;
    pago_yape: number;
    pago_tarjeta: number;
    pago_efectivo: number;
    billete?: string;
    estado_nota_despacho?: string;
    comprobante_nota_despacho?: string;
    fecha_facturado_nota_despacho?: string;
    ruc: string;
    enviado?: boolean; 
    etapa: string; 
    transaccion: string;
    detalle?: IItem[];  
}

export interface IBillingForm {
  ubigeo_origen: string;
  placa_vehiculo: string;
  dni_conductor: string;
  detalle_envio: IBillingFormDetail[];
}

export interface IBillingFormDetail {
  ruc_remitente: string;
  gal_diesel: number;
  gal_regular: number;
  gal_premium: number;
  gal_precio: number;
  scop_diesel: string;
  scop_regular: string;
  scop_premium: string;
}

export interface IBillingCompleteForm {
  origen: IOrigen;
  vehiculo: IVehiculo;
  conductor: IConductor;
  detalle_items: IBillingCompleteFormDetail[];
}

export interface IBillingCompleteFormDetail {
  remitente: IRemitente; 
  destinatario: IDestinatario;
  gal_diesel: number;
  gal_regular: number;
  gal_premium: number;
  gal_precio: number;
  scop_diesel: string;
  scop_regular: string;
  scop_premium: string;  
}