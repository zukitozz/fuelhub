import { IBilling } from "./billing.interface";
import { ICarrier } from "./carrier.interface";

export interface IEnvioGuiaRemision {
    factura: IBilling;
    gr_remitente:ICarrier;
    gr_transportista:ICarrier;
}