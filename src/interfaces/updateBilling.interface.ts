export interface ApproveGuiaRequest {
  id: string;
  igv: number;
  igv_unitario: number;
  precio: number;
  precio_unitario: number;  
  valor: number;
  valor_unitario: number;   
  pago_efectivo: number;  
  pago_tarjeta: number;
  pago_yape: number;    
  total_gravadas: number;   
  total_igv: number;   
  total_venta: number;   
}