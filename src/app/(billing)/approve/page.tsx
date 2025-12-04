'use client';
import useSWR from 'swr';
import { aproveBilling, listBilling } from "@/actions";

import { Constants } from '@/constants/Constants';
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useState } from 'react';
import moment, { Moment } from 'moment';
import { ApproveGuiaRequest } from '@/interfaces';

export default function AproovePage() {
    const fetcher = (url: string) => listBilling(url, fechaEmision, '', null);
    const { data } = useSWR(`${Constants.API_URL}/billing`, fetcher);
    const [ fechaEmision, setFechaEmision] = useState<Date | null>(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const historic = data?.historic?.items || [];
    const handleSubmitFormData = async (id: string, precio: number, cantidad: number, transaccion: string) => {
        setIsLoading(true);
        try {
            const cantidad_formated = ((+cantidad)*1000)/1000;
            const precio_unitario = +((+precio).toFixed(2));
            const valor_unitario = +((precio_unitario / 1.18).toFixed(10));
            const igv_unitario = +((precio_unitario - valor_unitario).toFixed(10));
            const precio_formated = +((cantidad_formated * precio_unitario).toFixed(2));
            const valor = +(cantidad_formated * valor_unitario).toFixed(2);
            const igv = +((cantidad_formated * igv_unitario).toFixed(2));            
            const payload: ApproveGuiaRequest = {
                id,
                igv,
                igv_unitario,
                precio: precio_formated,
                precio_unitario,
                valor,
                valor_unitario,
                total_gravadas: valor,
                total_igv: igv,
                total_venta: precio_formated,
                pago_efectivo: 0,
                pago_tarjeta: 0,
                pago_yape: 0,
                transaccion: transaccion.split(","),
            };
            const respBilling = await aproveBilling(payload);
            if (respBilling.result) {
                alert('Comprobante actualizado correctamente');
            } else {
                // Handle error response
                alert(respBilling.message || 'Error al actualizar el comprobante');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    const [precioState, setPrecioState] = useState("");

    return(
        <>
            <div className="mb-10">
                <Datetime
                    className="appearance-none"
                    value={fechaEmision??new Date()}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false} 
                    closeOnSelect={true}
                    onChange={(value: string | Moment) => {
                        if (typeof value === 'string') {
                            setFechaEmision(moment(value, "YYYY-MM-DD").toDate());
                        } else if (moment.isMoment(value)) {
                            setFechaEmision(value.toDate());
                        } else {
                            setFechaEmision(null);
                        }
                    }}
                />
            </div>
            <div className="mb-10">
                <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Fecha
                    </th>   
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Servicio
                    </th>
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Precio
                    </th>
                    <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        Acciones
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {historic.filter((item: any) => (item.tipo_comprobante === '01')).map((item : any) => (
                    <tr
                        key={item.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" 
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.fecha_actual}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.detalle[0]?.descripcion} - {item.receptor?.razon_social}
                        </td>
                        <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <input 
                        type="number"
                        name="precio_unitario" 
                        defaultValue={ item.detalle[0]?.precio_unitario }
                        disabled={ item.etapa !== 'CREATED' }
                        onChange={(e) => setPrecioState(e.target.value)}
                        className="`block w-full px-4 py-3 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`"
                        /> 
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 ">
                            <button
                            className={`${isLoading || item.etapa !== 'CREATED' ? 'bg-gray-400' : 'bg-blue-400'} px-4 py-2 rounded-xl`}
                            disabled={isLoading || item.etapa !== 'CREATED' }
                            onClick={() => handleSubmitFormData(item.id, (+precioState)===0?item.detalle[0]?.precio_unitario:+precioState, item.detalle[0]?.cantidad, historic.filter((it:any) => it.transaccion === item.transaccion).map((it:any) => it.id).join(",")) }
                            >
                            Actualizar
                            </button>
                        </td>
                    </tr>
                    ))}   
                </tbody>
                </table>            
            </div>            
        </>

    )
}