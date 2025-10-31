import { IDestinatario, IOrigen, IProduct } from "../interfaces";

export class Product implements IProduct{
    id?: string | undefined;
    origen: IOrigen;
    destino: IDestinatario;
    precio_galon: number;
    constructor( origen: IOrigen, destino: IDestinatario, precio_galon: number){
        this.origen = origen;
        this.destino = destino;
        this.precio_galon = precio_galon;
    }

}