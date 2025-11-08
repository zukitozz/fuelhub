import { IDestinatario } from "./destinatario.interface";
import { IOrigen } from "./origen.interface";

export interface IProductForm {
  id_origen: string;
  ruc_destino: string;
  precio_galon: number;
}

export interface IProduct {
  id?: string;
  origen: IOrigen;
  destino: IDestinatario;
  precio_galon: number;
}