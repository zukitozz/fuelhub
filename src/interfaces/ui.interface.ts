export interface ILastEvaluatedKey {
    fecha_emision: string;
    id:string;
    fecha_actual:string;
}

export interface IPagination {
    lastValue: ILastEvaluatedKey | null;
    page: number;
}