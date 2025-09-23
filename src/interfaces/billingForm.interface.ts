export interface IBillingForm {
  ubigeo_origen: string;
  placa_vehiculo: string;
  dni_conductor: string;
  detalle_envio: IBillingFormDetail[];
}

export interface IBillingFormDetail {
  ruc_remitente: string; 
  ruc_destinatario: string;
  gal_diesel: number;
  gal_regular: number;
  gal_premium: number;
  gal_precio: number;
}